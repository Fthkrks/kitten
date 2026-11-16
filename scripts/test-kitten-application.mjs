import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Run the actual TypeScript handler and email helpers with isolated SMTP/database
// transports. These tests cannot send email or read the developer's secrets.
function setup({ configured = true, mailResults = [], apiStatus = 200, apiPayload, apiError, saved = false } = {}) {
  const sent = [], logs = [], fetches = [], transports = [], timeouts = [];
  const env = configured ? { EMAIL_USER: "sender@example.com", EMAIL_PASSWORD: "test-only", ADMIN_EMAIL: "admin@example.com" } : {};
  const questions = [
    { id: 11, Question: "Tell us about your home <&>", isElective: false, Options: {} },
    { id: 12, Question: "Children?", isElective: true, Options: { 1: "Yes", 2: "No" } },
  ];
  function load(file, modules = {}) {
    const exports = {};
    const source = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(source, {
      exports, Buffer, Response, AbortSignal: { timeout: ms => { timeouts.push(ms); return AbortSignal.timeout(ms); } }, process: { env },
      console: { warn: (...args) => logs.push(args), error: (...args) => logs.push(args) },
      require: name => {
        assert.ok(name in modules, `Unexpected import ${name}`);
        return modules[name];
      },
      fetch: async (url, options) => {
        fetches.push({ url, options });
        if (apiError) throw apiError;
        return Response.json(apiPayload ?? { data: { label: "Application", Desc: "Description", KittenQuestion: questions } }, { status: apiStatus });
      },
    }, { filename: file });
    return exports;
  }
  const shared = load("lib/kitten-application.ts");
  const fallback=JSON.parse(readFileSync(new URL('../lib/cms-fallback.json',import.meta.url),'utf8')).site_content.find(r=>r.key==='application').data;
  const raw=apiPayload?.data?.attributes||apiPayload?.data;
  const source=raw?.KittenQuestion||questions;
  const normalized=source.map(q=>({id:q.id,question:q.Question,isElective:q.isElective,options:Object.values(q.Options||{}).filter(o=>!/^please note/i.test(o)),...(Object.values(q.Options||{}).find(o=>/^please note/i.test(o))?{note:Object.values(q.Options).find(o=>/^please note/i.test(o))}:{})}));
  const data={fetchKittenAppData:async()=>apiStatus!==200||apiError?fallback:{title:'Application',description:'Description',questions:normalized}};
  const inserts=[];
  const email = load("lib/email.ts", {
    "@/lib/kitten-application": shared,
    nodemailer: {
      createTransport: options => {
        transports.push(options);
        return { sendMail: async message => {
          sent.push(message);
          const result = mailResults[sent.length - 1];
          if (result instanceof Error) throw result;
          return result || { accepted: [message.to], rejected: [] };
        } };
      },
    },
  });
  const { POST } = load("app/api/kitten-app-submit/route.ts", {
    "@/lib/cms": {saveApplication:async(contact,answers)=>{inserts.push({contact,answers});return saved}},
    "@/lib/email": email,
    "@/lib/kitten-application": shared,
    "@/lib/kitten-application-data": data,
  });
  const post = body => POST(new Request("http://localhost/api/kitten-app-submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
  return { post, POST, data, email, env, sent, logs, fetches, transports, timeouts, inserts };
}

const valid = { firstName: " Test ", lastName: "Applicant", email: "test@example.com", phone: "555-0100", streetAddress: "123 Test Street", city: "Austin", state: "TX", zip: "78701" };

test("missing, blank, mistyped, invalid-email, and overlong contact fields return 400", async () => {
  const app = setup();
  for (const body of [{}, { ...valid, firstName: "   " }, { ...valid, phone: 123 }, { ...valid, email: "invalid" }, { ...valid, lastName: "x".repeat(101) }, { ...valid, firstName: "Test\r\nInjected" }]) {
    assert.equal((await app.post(body)).status, 400);
  }
  assert.equal(app.sent.length, 0);
});

test("missing or incomplete email configuration returns 503 without sending or logging applicant data", async () => {
  const app = setup({ configured: false });
  const response = await app.post(valid);
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.match(result.error, /has not been received/);
  assert.match(result.error, /astridmooncattery@gmail.com/);
  assert.notEqual(result.success, true);
  assert.equal(app.sent.length, 0);
  assert.equal(app.logs.length, 0);
  for (const missing of ["EMAIL_USER", "EMAIL_PASSWORD", "ADMIN_EMAIL"]) {
    const incomplete = setup();
    delete incomplete.env[missing];
    assert.equal((await incomplete.post(valid)).status, 503);
    assert.equal(incomplete.sent.length, 0);
  }
});

test("failed admin notification never confirms receipt and does not send applicant confirmation", async () => {
  const app = setup({ mailResults: [new Error("Private SMTP detail: test@example.com")] });
  const response = await app.post(valid);
  assert.equal(response.status, 503);
  assert.notEqual((await response.json()).success, true);
  assert.equal(app.sent.length, 1);
  assert.equal(app.sent[0].to, "admin@example.com");
  assert.ok(!JSON.stringify(app.logs).includes("test@example.com"));
});

test("SMTP recipient rejection also returns 503", async () => {
  const app = setup({ mailResults: [{ accepted: [], rejected: ["admin@example.com"] }] });
  assert.equal((await app.post(valid)).status, 503);
  assert.equal(app.sent.length, 1);
});

test("admin receipt precedes confirmation; submitted values are trimmed and HTML-escaped", async () => {
  const app = setup();
  const response = await app.post({ ...valid, firstName: ' <img src=x onerror="alert(1)"> ', dynamicAnswers: { 11: " <script>private answer</script> ", 12: " Yes " }, questions: [{ question: "Forged client question" }] });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, message: "Application received.", confirmationSent: true });
  assert.deepEqual(app.sent.map(m => m.to), ["admin@example.com", "test@example.com"]);
  assert.equal(app.sent[0].replyTo, "test@example.com");
  assert.ok(app.sent[0].html.includes("&lt;img"));
  assert.ok(app.sent[0].html.includes("&lt;script&gt;private answer&lt;/script&gt;"));
  assert.ok(app.sent[0].html.includes("Tell us about your home &lt;&amp;&gt;"));
  assert.ok(!app.sent[0].html.includes("Forged client question"));
  assert.ok(!app.sent[1].html.includes("<img"));
  assert.ok(app.sent[0].text.includes("Answer: Yes"));
  assert.ok(app.transports.every(t => t.requireTLS && t.tls?.rejectUnauthorized !== false));
});

test("confirmation failure still reports an admin-received application without prompting a duplicate", async () => {
  const app = setup({ mailResults: [undefined, new Error("Confirmation unavailable")] });
  const response = await app.post(valid);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).confirmationSent, false);
  assert.equal(app.sent.length, 2);
});

test("honeypot and invalid or oversized dynamic answers cannot be submitted", async () => {
  const app = setup();
  for (const body of [{ ...valid, website: "filled" }, { ...valid, dynamicAnswers: [] }, { ...valid, dynamicAnswers: { 12: "Other" } }, { ...valid, dynamicAnswers: { 11: "x".repeat(5001) } }, { ...valid, dynamicAnswers: { 99: "Unknown question" } }]) {
    assert.equal((await app.post(body)).status, 400);
  }
  assert.equal(app.sent.length, 0);
});

test("malformed JSON and oversized request bodies are rejected", async () => {
  const app = setup();
  const request = body => new Request("http://localhost/api/kitten-app-submit", { method: "POST", headers: { "Content-Type": "application/json" }, body });
  assert.equal((await app.POST(request("{"))).status, 400);
  assert.equal((await app.POST(request("null"))).status, 400);
  assert.equal((await app.POST(request("x".repeat(128 * 1024 + 1)))).status, 413);
  assert.equal(app.sent.length, 0);
});

test("bundled Supabase fallback retains all 18 questions and separate colour note",()=>{
 const data=JSON.parse(readFileSync(new URL('../lib/cms-fallback.json',import.meta.url),'utf8')).site_content.find(r=>r.key==='application').data;
 assert.equal(data.questions.length,18);assert.deepEqual(data.questions[1].options,['Black Golden','Blue Golden','No preference']);assert.match(data.questions[1].note,/^Please note:/);
});
test("saved applications succeed without SMTP and after SMTP failure, with server question snapshots",async()=>{
 for(const options of [{configured:false},{mailResults:[new Error('private failure')]}]){
  const app=setup({...options,saved:true});const response=await app.post({...valid,dynamicAnswers:{11:'Our home',12:'Yes'}});
  assert.equal(response.status,200);assert.equal((await response.json()).confirmationSent,false);assert.equal(app.inserts.length,1);assert.equal(app.inserts[0].contact.firstName,'Test');assert.equal(app.inserts[0].answers[0].question,'Tell us about your home <&>');assert.equal(app.inserts[0].answers[0].answer,'Our home');
 }
});

test("only starred questions require answers, for both radio choices and textareas", async () => {
  const app = setup({ apiPayload: { data: { KittenQuestion: [
    { id: 1, Question: "Pick one *", isElective: true, Options: { 1: "Yes", 2: "No" } },
    { id: 2, Question: "Tell us more *", isElective: false, Options: {} },
    { id: 3, Question: "Optional", isElective: true, Options: { 1: "Yes" } },
  ] } } });
  for (const dynamicAnswers of [undefined, {}, { 1: " ", 2: " " }, { 1: "Yes" }, { 2: "Answer" }]) {
    const response = await app.post({ ...valid, dynamicAnswers });
    assert.equal(response.status, 400);
  }
  assert.equal(app.sent.length, 0);
  assert.equal((await app.post({ ...valid, dynamicAnswers: { 1: "Yes", 2: "Answer" } })).status, 200);
});

test("a 'Please note' option is shown as a note, not as a choice", async () => {
  const app = setup({ apiPayload: { data: { KittenQuestion: [{ id: 1, Question: "Colour?", isElective: true, Options: { 1: "Blue", 2: "Please note: shades vary." } }] } } });
  const data = await app.data.fetchKittenAppData();
  assert.deepEqual(Array.from(data.questions[0].options), ["Blue"]);
  assert.equal(data.questions[0].note, "Please note: shades vary.");
  const fallback = await setup({ apiStatus: 503 }).data.fetchKittenAppData();
  assert.ok(fallback.questions.some(q => q.note?.startsWith("Please note") && !q.options.some(o => o.startsWith("Please note"))));
});

test("the applicant's note under a 'Please note' question is optional and reaches the admin email", async () => {
  const payload = { data: { KittenQuestion: [
    { id: 1, Question: "Colour?", isElective: true, Options: { 1: "Blue", 2: "Please note: shades vary." } },
    { id: 2, Question: "Plain?", isElective: true, Options: { 1: "Yes" } },
  ] } };
  const app = setup({ apiPayload: payload });
  assert.equal((await app.post({ ...valid, dynamicAnswers: { 1: "Blue" } })).status, 200);
  assert.equal((await app.post({ ...valid, dynamicAnswers: { 1: "Blue", "1-note": "Lighter shade <please>" } })).status, 200);
  assert.ok(app.sent.some(m => m.html.includes("Colour? (note)") && m.html.includes("Lighter shade &lt;please&gt;")));
  assert.equal((await app.post({ ...valid, dynamicAnswers: { 2: "Yes", "2-note": "x" } })).status, 400);
  assert.equal((await app.post({ ...valid, dynamicAnswers: { "1-note": "x".repeat(5001) } })).status, 400);
});
