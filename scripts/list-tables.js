import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hievmwwctjjlhmssoxsu.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZXZtd3djdGpqbGhtc3NveHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMDc3NTIsImV4cCI6MjA4NjY4Mzc1Mn0.4GQLx3_rMYJzsvIW8GfzeJdaNxVtz_NE-aSuYX7qGno'
const adminToken = 'sbp_19c0b76f9f293efd0c0c8223629fad18eefb69ac'

async function listTables() {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/information_schema.tables?table_schema=eq.public`,
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'apikey': anonKey,
        }
      }
    )

    console.log('Response status:', response.status, response.statusText)

    if (!response.ok) {
      console.error('Error:', response.statusText)
      const error = await response.text()
      console.error('Details:', error)
      return
    }

    const tables = await response.json()
    console.log('\n📋 Supabase Tabloları:\n')
    tables.forEach((table) => {
      console.log(`  • ${table.table_name}`)
    })
    console.log(`\nToplam: ${tables.length} tablo\n`)
  } catch (error) {
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)
  }
}

listTables()
