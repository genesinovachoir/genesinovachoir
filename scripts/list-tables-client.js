import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hievmwwctjjlhmssoxsu.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZXZtd3djdGpqbGhtc3NveHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMDc3NTIsImV4cCI6MjA4NjY4Mzc1Mn0.4GQLx3_rMYJzsvIW8GfzeJdaNxVtz_NE-aSuYX7qGno'

const supabase = createClient(supabaseUrl, anonKey)

async function listTables() {
  try {
    console.log('Supabase\'ye bağlanıyor...')

    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (error) {
      console.error('Supabase Error:', error.message)
      return
    }

    console.log('\n📋 Supabase Tabloları:\n')
    data.forEach((table) => {
      console.log(`  • ${table.table_name}`)
    })
    console.log(`\nToplam: ${data.length} tablo\n`)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

listTables()
