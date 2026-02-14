import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.analises (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
        evento_id uuid REFERENCES public.eventos(id) ON DELETE SET NULL,
        slug character varying(255) NOT NULL UNIQUE,
        titulo character varying(500) NOT NULL,
        subtitulo text,
        lutador1_id uuid REFERENCES public.lutadores(id),
        lutador2_id uuid REFERENCES public.lutadores(id),
        artigo_conteudo text NOT NULL,
        tactical_breakdown jsonb NOT NULL DEFAULT '{}',
        fight_prediction jsonb NOT NULL DEFAULT '{}',
        fighter1_info jsonb NOT NULL DEFAULT '{}',
        fighter2_info jsonb NOT NULL DEFAULT '{}',
        evento_nome character varying(255),
        evento_data timestamp with time zone,
        evento_local character varying(255),
        categoria_peso character varying(100),
        num_rounds integer DEFAULT 5,
        is_titulo boolean DEFAULT false,
        broadcast character varying(255),
        status character varying(20) DEFAULT 'publicado',
        created_at timestamp with time zone DEFAULT now(),
        updated_at timestamp with time zone DEFAULT now()
      );
    `);
    console.log('✅ Table analises created');

    await client.query(`CREATE INDEX IF NOT EXISTS idx_analises_slug ON public.analises (slug)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analises_evento ON public.analises (evento_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analises_created ON public.analises (created_at DESC)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analises_status ON public.analises (status)`);
    console.log('✅ Indexes created');

    // Check if trigger exists before creating
    const triggerExists = await client.query(`
      SELECT 1 FROM pg_trigger WHERE tgname = 'update_analises_updated_at'
    `);
    if (triggerExists.rows.length === 0) {
      await client.query(`
        CREATE TRIGGER update_analises_updated_at 
          BEFORE UPDATE ON public.analises 
          FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
      `);
      console.log('✅ Trigger created');
    }

    console.log('✅ Migration complete!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
