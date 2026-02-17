// ConvertKit formlarınızı listelemek için script
// Kullanım: node scripts/check-kit-forms.js

require('dotenv').config();

async function listForms() {
  const apiSecret = process.env.KIT_API_SECRET;
  
  if (!apiSecret) {
    console.error('❌ KIT_API_SECRET bulunamadı! .env dosyanızı kontrol edin.');
    process.exit(1);
  }

  try {
    console.log('🔍 ConvertKit formlarınız getiriliyor...\n');
    
    const response = await fetch(
      `https://api.convertkit.com/v3/forms?api_secret=${apiSecret}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.forms || data.forms.length === 0) {
      console.log('ℹ️  Henüz hiç form oluşturulmamış.');
      console.log('\n📝 Yeni form oluşturmak için:');
      console.log('   https://app.convertkit.com/forms/designers/new');
      return;
    }
    
    console.log(`✅ ${data.forms.length} form bulundu:\n`);
    console.log('═══════════════════════════════════════════════════════');
    
    data.forms.forEach((form, index) => {
      console.log(`\n${index + 1}. ${form.name}`);
      console.log(`   📋 Form ID: ${form.id}`);
      console.log(`   📊 Subscribers: ${form.subscription_count || 0}`);
      console.log(`   🔗 URL: ${form.url || 'N/A'}`);
      console.log(`   📅 Oluşturulma: ${form.created_at ? new Date(form.created_at).toLocaleDateString('tr-TR') : 'N/A'}`);
    });
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('\n💡 Form ID\'yi .env dosyanıza ekleyin:');
    console.log('   KIT_FORM_ID=BURAYA_FORM_ID_YAZIN');
    console.log('\n📖 Örnek:');
    console.log(`   KIT_FORM_ID=${data.forms[0].id}`);
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    console.error('\n🔧 Kontrol edin:');
    console.error('   - KIT_API_SECRET doğru mu?');
    console.error('   - İnternet bağlantınız var mı?');
  }
}

listForms();
