--
-- PostgreSQL database dump
--

\restrict DYBHOJCpHBQ7oFH375TvkzgPm3egTI15AYDMadM90RhxUP63CzrQTGtRBYWIoa3

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: categoria_noticia; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.categoria_noticia AS ENUM (
    'lutadores',
    'lutas',
    'backstage'
);


ALTER TYPE public.categoria_noticia OWNER TO ufcnews;

--
-- Name: metodo_vitoria; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.metodo_vitoria AS ENUM (
    'KO/TKO',
    'Submission',
    'Decision - Unanimous',
    'Decision - Split',
    'Decision - Majority',
    'DQ',
    'No Contest',
    'Draw'
);


ALTER TYPE public.metodo_vitoria OWNER TO ufcnews;

--
-- Name: nivel_usuario; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.nivel_usuario AS ENUM (
    'iniciante',
    'amateur',
    'contender',
    'challenger',
    'elite',
    'champion',
    'legend'
);


ALTER TYPE public.nivel_usuario OWNER TO ufcnews;

--
-- Name: status_amizade; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.status_amizade AS ENUM (
    'pendente',
    'aceita',
    'bloqueada'
);


ALTER TYPE public.status_amizade OWNER TO ufcnews;

--
-- Name: status_duelo; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.status_duelo AS ENUM (
    'pendente',
    'aceito',
    'recusado',
    'finalizado',
    'cancelado'
);


ALTER TYPE public.status_duelo OWNER TO ufcnews;

--
-- Name: status_evento; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.status_evento AS ENUM (
    'agendado',
    'ao_vivo',
    'finalizado',
    'cancelado'
);


ALTER TYPE public.status_evento OWNER TO ufcnews;

--
-- Name: status_liga; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.status_liga AS ENUM (
    'ativa',
    'pausada',
    'encerrada'
);


ALTER TYPE public.status_liga OWNER TO ufcnews;

--
-- Name: status_luta; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.status_luta AS ENUM (
    'agendada',
    'ao_vivo',
    'finalizada',
    'cancelada'
);


ALTER TYPE public.status_luta OWNER TO ufcnews;

--
-- Name: tipo_conquista; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.tipo_conquista AS ENUM (
    'sniper',
    'on_fire',
    'dog_whisperer',
    'giant_slayer',
    'champion',
    'knockout_artist',
    'submission_specialist',
    'analyst',
    'globetrotter',
    'first_blood',
    'social_butterfly',
    'league_founder',
    'perfect_card',
    'underdog_hunter',
    'main_event_master',
    'streak_5',
    'streak_10',
    'streak_20'
);


ALTER TYPE public.tipo_conquista OWNER TO ufcnews;

--
-- Name: tipo_liga; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.tipo_liga AS ENUM (
    'publica',
    'privada'
);


ALTER TYPE public.tipo_liga OWNER TO ufcnews;

--
-- Name: tipo_luta; Type: TYPE; Schema: public; Owner: ufcnews
--

CREATE TYPE public.tipo_luta AS ENUM (
    'main_event',
    'co_main',
    'card_principal',
    'preliminar',
    'early_prelim'
);


ALTER TYPE public.tipo_luta OWNER TO ufcnews;

--
-- Name: atualizar_contador_amigos(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.atualizar_contador_amigos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'UPDATE' AND NEW.status = 'aceita' AND OLD.status = 'pendente' THEN
        UPDATE usuarios_arena SET total_amigos = total_amigos + 1 WHERE id = NEW.usuario_id;
        UPDATE usuarios_arena SET total_amigos = total_amigos + 1 WHERE id = NEW.amigo_id;
    ELSIF TG_OP = 'DELETE' AND OLD.status = 'aceita' THEN
        UPDATE usuarios_arena SET total_amigos = total_amigos - 1 WHERE id = OLD.usuario_id;
        UPDATE usuarios_arena SET total_amigos = total_amigos - 1 WHERE id = OLD.amigo_id;
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.atualizar_contador_amigos() OWNER TO ufcnews;

--
-- Name: atualizar_contador_membros(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.atualizar_contador_membros() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE ligas SET total_membros = total_membros + 1 WHERE id = NEW.liga_id;
        UPDATE usuarios_arena SET total_ligas = total_ligas + 1 WHERE id = NEW.usuario_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE ligas SET total_membros = total_membros - 1 WHERE id = OLD.liga_id;
        UPDATE usuarios_arena SET total_ligas = total_ligas - 1 WHERE id = OLD.usuario_id;
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.atualizar_contador_membros() OWNER TO ufcnews;

--
-- Name: atualizar_nivel(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.atualizar_nivel() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.nivel := CASE
        WHEN NEW.xp_total >= 25000 THEN 'legend'
        WHEN NEW.xp_total >= 15000 THEN 'champion'
        WHEN NEW.xp_total >= 10000 THEN 'elite'
        WHEN NEW.xp_total >= 6000 THEN 'challenger'
        WHEN NEW.xp_total >= 3000 THEN 'contender'
        WHEN NEW.xp_total >= 1000 THEN 'amateur'
        ELSE 'iniciante'
    END;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_nivel() OWNER TO ufcnews;

--
-- Name: cleanup_old_rate_limits(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.cleanup_old_rate_limits() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM comentarios_rate_limit
    WHERE created_at < NOW() - INTERVAL '1 hour';
END;
$$;


ALTER FUNCTION public.cleanup_old_rate_limits() OWNER TO ufcnews;

--
-- Name: gerar_codigo_convite(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.gerar_codigo_convite() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.codigo_convite IS NULL AND NEW.tipo = 'privada' THEN
        NEW.codigo_convite := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.gerar_codigo_convite() OWNER TO ufcnews;

--
-- Name: update_comentarios_updated_at(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.update_comentarios_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_comentarios_updated_at() OWNER TO ufcnews;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: ufcnews
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO ufcnews;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: amizades; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.amizades (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    usuario_id uuid NOT NULL,
    amigo_id uuid NOT NULL,
    status public.status_amizade DEFAULT 'pendente'::public.status_amizade,
    created_at timestamp with time zone DEFAULT now(),
    accepted_at timestamp with time zone,
    CONSTRAINT nao_auto_amigo CHECK ((usuario_id <> amigo_id))
);


ALTER TABLE public.amizades OWNER TO ufcnews;

--
-- Name: atividades; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.atividades (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    usuario_id uuid NOT NULL,
    tipo character varying(50) NOT NULL,
    titulo character varying(100) NOT NULL,
    descricao text,
    dados jsonb,
    publica boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.atividades OWNER TO ufcnews;

--
-- Name: comentarios; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.comentarios (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    noticia_id uuid NOT NULL,
    parent_id uuid,
    autor_nome character varying(50) NOT NULL,
    autor_email character varying(255),
    autor_fingerprint character varying(64) NOT NULL,
    conteudo text NOT NULL,
    status character varying(20) DEFAULT 'aprovado'::character varying,
    reportado_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.comentarios OWNER TO ufcnews;

--
-- Name: comentarios_rate_limit; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.comentarios_rate_limit (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fingerprint character varying(64) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.comentarios_rate_limit OWNER TO ufcnews;

--
-- Name: conquistas; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.conquistas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    usuario_id uuid NOT NULL,
    tipo public.tipo_conquista NOT NULL,
    detalhes jsonb,
    desbloqueada_em timestamp with time zone DEFAULT now()
);


ALTER TABLE public.conquistas OWNER TO ufcnews;

--
-- Name: duelos; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.duelos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    desafiante_id uuid NOT NULL,
    desafiado_id uuid NOT NULL,
    evento_id uuid NOT NULL,
    status public.status_duelo DEFAULT 'pendente'::public.status_duelo,
    vencedor_id uuid,
    pontos_desafiante integer DEFAULT 0,
    pontos_desafiado integer DEFAULT 0,
    acertos_desafiante integer DEFAULT 0,
    acertos_desafiado integer DEFAULT 0,
    mensagem_desafio character varying(200),
    created_at timestamp with time zone DEFAULT now(),
    aceito_em timestamp with time zone,
    finalizado_em timestamp with time zone,
    CONSTRAINT duelo_diferente CHECK ((desafiante_id <> desafiado_id))
);


ALTER TABLE public.duelos OWNER TO ufcnews;

--
-- Name: evento_pontuacao; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.evento_pontuacao (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    evento_id uuid NOT NULL,
    usuario_id uuid NOT NULL,
    pontos_totais integer DEFAULT 0,
    acertos integer DEFAULT 0,
    total_lutas integer DEFAULT 0,
    previsoes_perfeitas integer DEFAULT 0,
    card_perfeito boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.evento_pontuacao OWNER TO ufcnews;

--
-- Name: eventos; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.eventos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying(255) NOT NULL,
    slug character varying(255),
    data_evento timestamp with time zone NOT NULL,
    local_evento character varying(255),
    cidade character varying(100),
    pais character varying(100),
    tipo character varying(50) DEFAULT 'PPV'::character varying,
    status public.status_evento DEFAULT 'agendado'::public.status_evento,
    imagem_url character varying(500),
    descricao text,
    onde_assistir character varying(255) DEFAULT 'UFC Fight Pass, Combate'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    ufc_slug character varying(100),
    poster_url character varying(500),
    horario_early_prelims character varying(20),
    horario_prelims character varying(20),
    horario_main_card character varying(20),
    last_scraped_at timestamp with time zone,
    broadcast_info jsonb DEFAULT '{}'::jsonb
);


ALTER TABLE public.eventos OWNER TO ufcnews;

--
-- Name: liga_chat; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.liga_chat (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    liga_id uuid NOT NULL,
    usuario_id uuid NOT NULL,
    mensagem text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT liga_chat_mensagem_check CHECK ((length(mensagem) <= 500))
);


ALTER TABLE public.liga_chat OWNER TO ufcnews;

--
-- Name: liga_membros; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.liga_membros (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    liga_id uuid NOT NULL,
    usuario_id uuid NOT NULL,
    pontos_temporada integer DEFAULT 0,
    posicao_atual integer DEFAULT 0,
    melhor_posicao integer,
    pior_posicao integer,
    eventos_participados integer DEFAULT 0,
    is_admin boolean DEFAULT false,
    joined_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.liga_membros OWNER TO ufcnews;

--
-- Name: liga_temporadas; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.liga_temporadas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    liga_id uuid NOT NULL,
    numero_temporada integer NOT NULL,
    inicio timestamp with time zone NOT NULL,
    fim timestamp with time zone,
    campeao_id uuid,
    pontos_campeao integer,
    total_participantes integer,
    total_previsoes integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.liga_temporadas OWNER TO ufcnews;

--
-- Name: ligas; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.ligas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying(50) NOT NULL,
    descricao character varying(200),
    imagem_url text,
    criador_id uuid NOT NULL,
    tipo public.tipo_liga DEFAULT 'privada'::public.tipo_liga,
    codigo_convite character varying(8),
    status public.status_liga DEFAULT 'ativa'::public.status_liga,
    temporada_atual integer DEFAULT 1,
    max_membros integer DEFAULT 50,
    apenas_main_card boolean DEFAULT false,
    mostrar_picks_antes boolean DEFAULT false,
    total_membros integer DEFAULT 1,
    total_eventos_disputados integer DEFAULT 0,
    campeao_id uuid,
    campeao_desde timestamp with time zone,
    defesas_titulo integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT nome_liga_valido CHECK ((length((nome)::text) >= 3))
);


ALTER TABLE public.ligas OWNER TO ufcnews;

--
-- Name: lutadores; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.lutadores (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying(255) NOT NULL,
    apelido character varying(255),
    categoria_peso character varying(100),
    url_perfil character varying(500),
    imagem_url character varying(500),
    ativo boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    pais character varying(50),
    idade integer,
    altura character varying(20),
    envergadura character varying(20),
    vitorias integer DEFAULT 0,
    derrotas integer DEFAULT 0,
    empates integer DEFAULT 0,
    nocautes integer DEFAULT 0,
    finalizacoes integer DEFAULT 0,
    decisoes integer DEFAULT 0,
    ranking_divisao integer,
    academia character varying(255),
    estilo_luta character varying(100),
    cidade_natal character varying(100),
    data_nascimento date
);


ALTER TABLE public.lutadores OWNER TO ufcnews;

--
-- Name: lutas; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.lutas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    evento_id uuid NOT NULL,
    lutador1_id uuid NOT NULL,
    lutador2_id uuid NOT NULL,
    categoria_peso character varying(50) NOT NULL,
    ordem integer DEFAULT 0,
    tipo public.tipo_luta DEFAULT 'card_principal'::public.tipo_luta,
    rounds integer DEFAULT 3,
    vencedor_id uuid,
    metodo public.metodo_vitoria,
    round_final integer,
    tempo_final character varying(10),
    status public.status_luta DEFAULT 'agendada'::public.status_luta,
    is_titulo boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    lutador1_nome_display character varying(100),
    lutador2_nome_display character varying(100),
    is_featured boolean DEFAULT false,
    records_atualizados boolean DEFAULT false,
    CONSTRAINT check_lutadores_diferentes CHECK ((lutador1_id <> lutador2_id))
);


ALTER TABLE public.lutas OWNER TO ufcnews;

--
-- Name: noticia_entidades; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.noticia_entidades (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    noticia_id uuid,
    lutador_id uuid,
    tipo_mencao character varying(50) DEFAULT 'mencionado'::character varying,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.noticia_entidades OWNER TO ufcnews;

--
-- Name: noticias; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.noticias (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titulo character varying(500) NOT NULL,
    subtitulo text,
    conteudo_completo text,
    imagem_url character varying(500),
    fonte_url character varying(500) NOT NULL,
    fonte_nome character varying(100) DEFAULT 'MMAMania'::character varying,
    categoria public.categoria_noticia NOT NULL,
    hash_deduplicacao character varying(64),
    eh_sobre_ufc boolean DEFAULT true,
    visualizacoes integer DEFAULT 0,
    publicado_em timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.noticias OWNER TO ufcnews;

--
-- Name: notificacoes; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.notificacoes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    usuario_id uuid NOT NULL,
    tipo character varying(50) NOT NULL,
    titulo character varying(100) NOT NULL,
    mensagem text,
    dados jsonb,
    lida boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.notificacoes OWNER TO ufcnews;

--
-- Name: previsoes; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.previsoes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    usuario_id uuid NOT NULL,
    luta_id uuid NOT NULL,
    evento_id uuid NOT NULL,
    vencedor_previsto_id uuid,
    metodo_previsto public.metodo_vitoria,
    round_previsto integer,
    pontos_confianca integer DEFAULT 100,
    processada boolean DEFAULT false,
    acertou_vencedor boolean,
    acertou_metodo boolean,
    acertou_round boolean,
    pontos_base integer DEFAULT 0,
    multiplicador_metodo numeric(3,2) DEFAULT 1.0,
    multiplicador_round numeric(3,2) DEFAULT 1.0,
    multiplicador_underdog numeric(3,2) DEFAULT 1.0,
    multiplicador_confianca numeric(3,2) DEFAULT 1.0,
    pontos_ganhos integer DEFAULT 0,
    xp_ganho integer DEFAULT 0,
    odds_vencedor_previsto numeric(6,2),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT previsoes_pontos_confianca_check CHECK (((pontos_confianca >= 10) AND (pontos_confianca <= 500))),
    CONSTRAINT previsoes_round_previsto_check CHECK (((round_previsto >= 1) AND (round_previsto <= 5)))
);


ALTER TABLE public.previsoes OWNER TO ufcnews;

--
-- Name: previsoes_liga; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.previsoes_liga (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    previsao_id uuid NOT NULL,
    liga_id uuid NOT NULL,
    pontos_ganhos integer DEFAULT 0
);


ALTER TABLE public.previsoes_liga OWNER TO ufcnews;

--
-- Name: sync_logs; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.sync_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    started_at timestamp with time zone DEFAULT now(),
    finished_at timestamp with time zone,
    noticias_processadas integer DEFAULT 0,
    noticias_adicionadas integer DEFAULT 0,
    noticias_duplicadas integer DEFAULT 0,
    noticias_rejeitadas integer DEFAULT 0,
    erro text,
    status character varying(50) DEFAULT 'running'::character varying
);


ALTER TABLE public.sync_logs OWNER TO ufcnews;

--
-- Name: usuarios_arena; Type: TABLE; Schema: public; Owner: ufcnews
--

CREATE TABLE public.usuarios_arena (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(30) NOT NULL,
    display_name character varying(50),
    avatar_url text,
    bio character varying(200),
    email character varying(255) NOT NULL,
    senha_hash character varying(255) NOT NULL,
    pontos_totais integer DEFAULT 0,
    xp_total integer DEFAULT 0,
    nivel public.nivel_usuario DEFAULT 'iniciante'::public.nivel_usuario,
    streak_atual integer DEFAULT 0,
    melhor_streak integer DEFAULT 0,
    streak_main_event integer DEFAULT 0,
    melhor_streak_main_event integer DEFAULT 0,
    total_previsoes integer DEFAULT 0,
    previsoes_corretas integer DEFAULT 0,
    previsoes_perfeitas integer DEFAULT 0,
    underdogs_acertados integer DEFAULT 0,
    kos_acertados integer DEFAULT 0,
    subs_acertados integer DEFAULT 0,
    decisoes_acertadas integer DEFAULT 0,
    total_amigos integer DEFAULT 0,
    total_ligas integer DEFAULT 0,
    titulos_ganhos integer DEFAULT 0,
    picks_publicos boolean DEFAULT true,
    notificacoes_ativas boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_login_at timestamp with time zone,
    CONSTRAINT username_format CHECK (((username)::text ~ '^[a-zA-Z0-9_]{3,30}$'::text))
);


ALTER TABLE public.usuarios_arena OWNER TO ufcnews;

--
-- Name: v_eventos_por_mes; Type: VIEW; Schema: public; Owner: ufcnews
--

CREATE VIEW public.v_eventos_por_mes AS
 SELECT EXTRACT(year FROM data_evento) AS ano,
    EXTRACT(month FROM data_evento) AS mes,
    to_char(data_evento, 'TMMonth'::text) AS nome_mes,
    json_agg(json_build_object('id', id, 'nome', nome, 'slug', slug, 'data_evento', data_evento, 'local_evento', local_evento, 'cidade', cidade, 'pais', pais, 'tipo', tipo, 'status', status, 'imagem_url', imagem_url, 'poster_url', poster_url, 'total_lutas', ( SELECT count(*) AS count
           FROM public.lutas
          WHERE (lutas.evento_id = e.id))) ORDER BY data_evento) AS eventos
   FROM public.eventos e
  WHERE (data_evento >= (now() - '1 year'::interval))
  GROUP BY (EXTRACT(year FROM data_evento)), (EXTRACT(month FROM data_evento)), (to_char(data_evento, 'TMMonth'::text))
  ORDER BY (EXTRACT(year FROM data_evento)) DESC, (EXTRACT(month FROM data_evento)) DESC;


ALTER VIEW public.v_eventos_por_mes OWNER TO ufcnews;

--
-- Name: v_proximo_evento; Type: VIEW; Schema: public; Owner: ufcnews
--

CREATE VIEW public.v_proximo_evento AS
SELECT
    NULL::uuid AS id,
    NULL::character varying(255) AS nome,
    NULL::character varying(255) AS slug,
    NULL::timestamp with time zone AS data_evento,
    NULL::character varying(255) AS local_evento,
    NULL::character varying(100) AS cidade,
    NULL::character varying(100) AS pais,
    NULL::character varying(50) AS tipo,
    NULL::public.status_evento AS status,
    NULL::character varying(500) AS imagem_url,
    NULL::text AS descricao,
    NULL::character varying(255) AS onde_assistir,
    NULL::timestamp with time zone AS created_at,
    NULL::timestamp with time zone AS updated_at,
    NULL::bigint AS total_lutas,
    NULL::bigint AS tem_main_event;


ALTER VIEW public.v_proximo_evento OWNER TO ufcnews;

--
-- Name: v_proximo_evento_detalhado; Type: VIEW; Schema: public; Owner: ufcnews
--

CREATE VIEW public.v_proximo_evento_detalhado AS
SELECT
    NULL::uuid AS id,
    NULL::character varying(255) AS nome,
    NULL::character varying(255) AS slug,
    NULL::timestamp with time zone AS data_evento,
    NULL::character varying(255) AS local_evento,
    NULL::character varying(100) AS cidade,
    NULL::character varying(100) AS pais,
    NULL::character varying(50) AS tipo,
    NULL::public.status_evento AS status,
    NULL::character varying(500) AS imagem_url,
    NULL::text AS descricao,
    NULL::character varying(255) AS onde_assistir,
    NULL::timestamp with time zone AS created_at,
    NULL::timestamp with time zone AS updated_at,
    NULL::character varying(100) AS ufc_slug,
    NULL::character varying(500) AS poster_url,
    NULL::character varying(20) AS horario_early_prelims,
    NULL::character varying(20) AS horario_prelims,
    NULL::character varying(20) AS horario_main_card,
    NULL::timestamp with time zone AS last_scraped_at,
    NULL::jsonb AS broadcast_info,
    NULL::bigint AS total_lutas,
    NULL::json AS main_event;


ALTER VIEW public.v_proximo_evento_detalhado OWNER TO ufcnews;

--
-- Name: amizades amizade_unica; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.amizades
    ADD CONSTRAINT amizade_unica UNIQUE (usuario_id, amigo_id);


--
-- Name: amizades amizades_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.amizades
    ADD CONSTRAINT amizades_pkey PRIMARY KEY (id);


--
-- Name: atividades atividades_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.atividades
    ADD CONSTRAINT atividades_pkey PRIMARY KEY (id);


--
-- Name: comentarios comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);


--
-- Name: comentarios_rate_limit comentarios_rate_limit_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.comentarios_rate_limit
    ADD CONSTRAINT comentarios_rate_limit_pkey PRIMARY KEY (id);


--
-- Name: conquistas conquista_unica; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.conquistas
    ADD CONSTRAINT conquista_unica UNIQUE (usuario_id, tipo);


--
-- Name: conquistas conquistas_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.conquistas
    ADD CONSTRAINT conquistas_pkey PRIMARY KEY (id);


--
-- Name: duelos duelos_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.duelos
    ADD CONSTRAINT duelos_pkey PRIMARY KEY (id);


--
-- Name: evento_pontuacao evento_pontuacao_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.evento_pontuacao
    ADD CONSTRAINT evento_pontuacao_pkey PRIMARY KEY (id);


--
-- Name: evento_pontuacao evento_usuario_unico; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.evento_pontuacao
    ADD CONSTRAINT evento_usuario_unico UNIQUE (evento_id, usuario_id);


--
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- Name: eventos eventos_slug_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_slug_key UNIQUE (slug);


--
-- Name: liga_chat liga_chat_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_chat
    ADD CONSTRAINT liga_chat_pkey PRIMARY KEY (id);


--
-- Name: liga_membros liga_membros_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_membros
    ADD CONSTRAINT liga_membros_pkey PRIMARY KEY (id);


--
-- Name: liga_temporadas liga_temporadas_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_temporadas
    ADD CONSTRAINT liga_temporadas_pkey PRIMARY KEY (id);


--
-- Name: ligas ligas_codigo_convite_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.ligas
    ADD CONSTRAINT ligas_codigo_convite_key UNIQUE (codigo_convite);


--
-- Name: ligas ligas_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.ligas
    ADD CONSTRAINT ligas_pkey PRIMARY KEY (id);


--
-- Name: lutadores lutadores_nome_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutadores
    ADD CONSTRAINT lutadores_nome_key UNIQUE (nome);


--
-- Name: lutadores lutadores_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutadores
    ADD CONSTRAINT lutadores_pkey PRIMARY KEY (id);


--
-- Name: lutas lutas_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutas
    ADD CONSTRAINT lutas_pkey PRIMARY KEY (id);


--
-- Name: liga_membros membro_unico; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_membros
    ADD CONSTRAINT membro_unico UNIQUE (liga_id, usuario_id);


--
-- Name: noticia_entidades noticia_entidades_noticia_id_lutador_id_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticia_entidades
    ADD CONSTRAINT noticia_entidades_noticia_id_lutador_id_key UNIQUE (noticia_id, lutador_id);


--
-- Name: noticia_entidades noticia_entidades_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticia_entidades
    ADD CONSTRAINT noticia_entidades_pkey PRIMARY KEY (id);


--
-- Name: noticias noticias_fonte_url_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_fonte_url_key UNIQUE (fonte_url);


--
-- Name: noticias noticias_hash_deduplicacao_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_hash_deduplicacao_key UNIQUE (hash_deduplicacao);


--
-- Name: noticias noticias_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_pkey PRIMARY KEY (id);


--
-- Name: notificacoes notificacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.notificacoes
    ADD CONSTRAINT notificacoes_pkey PRIMARY KEY (id);


--
-- Name: previsoes_liga previsao_liga_unica; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes_liga
    ADD CONSTRAINT previsao_liga_unica UNIQUE (previsao_id, liga_id);


--
-- Name: previsoes previsao_unica; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes
    ADD CONSTRAINT previsao_unica UNIQUE (usuario_id, luta_id);


--
-- Name: previsoes_liga previsoes_liga_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes_liga
    ADD CONSTRAINT previsoes_liga_pkey PRIMARY KEY (id);


--
-- Name: previsoes previsoes_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes
    ADD CONSTRAINT previsoes_pkey PRIMARY KEY (id);


--
-- Name: sync_logs sync_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.sync_logs
    ADD CONSTRAINT sync_logs_pkey PRIMARY KEY (id);


--
-- Name: liga_temporadas temporada_unica; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_temporadas
    ADD CONSTRAINT temporada_unica UNIQUE (liga_id, numero_temporada);


--
-- Name: usuarios_arena usuarios_arena_email_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.usuarios_arena
    ADD CONSTRAINT usuarios_arena_email_key UNIQUE (email);


--
-- Name: usuarios_arena usuarios_arena_pkey; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.usuarios_arena
    ADD CONSTRAINT usuarios_arena_pkey PRIMARY KEY (id);


--
-- Name: usuarios_arena usuarios_arena_username_key; Type: CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.usuarios_arena
    ADD CONSTRAINT usuarios_arena_username_key UNIQUE (username);


--
-- Name: idx_amizades_amigo; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_amizades_amigo ON public.amizades USING btree (amigo_id);


--
-- Name: idx_amizades_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_amizades_usuario ON public.amizades USING btree (usuario_id);


--
-- Name: idx_atividades_created; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_atividades_created ON public.atividades USING btree (created_at DESC);


--
-- Name: idx_atividades_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_atividades_usuario ON public.atividades USING btree (usuario_id);


--
-- Name: idx_comentarios_created; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_comentarios_created ON public.comentarios USING btree (created_at DESC);


--
-- Name: idx_comentarios_fingerprint; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_comentarios_fingerprint ON public.comentarios USING btree (autor_fingerprint);


--
-- Name: idx_comentarios_noticia; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_comentarios_noticia ON public.comentarios USING btree (noticia_id);


--
-- Name: idx_comentarios_parent; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_comentarios_parent ON public.comentarios USING btree (parent_id);


--
-- Name: idx_comentarios_status; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_comentarios_status ON public.comentarios USING btree (status);


--
-- Name: idx_conquistas_tipo; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_conquistas_tipo ON public.conquistas USING btree (tipo);


--
-- Name: idx_conquistas_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_conquistas_usuario ON public.conquistas USING btree (usuario_id);


--
-- Name: idx_duelos_desafiado; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_duelos_desafiado ON public.duelos USING btree (desafiado_id);


--
-- Name: idx_duelos_desafiante; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_duelos_desafiante ON public.duelos USING btree (desafiante_id);


--
-- Name: idx_duelos_evento; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_duelos_evento ON public.duelos USING btree (evento_id);


--
-- Name: idx_duelos_status; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_duelos_status ON public.duelos USING btree (status);


--
-- Name: idx_evento_pontuacao_evento; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_evento_pontuacao_evento ON public.evento_pontuacao USING btree (evento_id, pontos_totais DESC);


--
-- Name: idx_evento_pontuacao_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_evento_pontuacao_usuario ON public.evento_pontuacao USING btree (usuario_id);


--
-- Name: idx_eventos_data; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_eventos_data ON public.eventos USING btree (data_evento DESC);


--
-- Name: idx_eventos_data_desc; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_eventos_data_desc ON public.eventos USING btree (data_evento DESC);


--
-- Name: idx_eventos_slug; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_eventos_slug ON public.eventos USING btree (slug);


--
-- Name: idx_eventos_status; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_eventos_status ON public.eventos USING btree (status);


--
-- Name: idx_eventos_ufc_slug; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_eventos_ufc_slug ON public.eventos USING btree (ufc_slug);


--
-- Name: idx_liga_chat_liga; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_liga_chat_liga ON public.liga_chat USING btree (liga_id, created_at DESC);


--
-- Name: idx_liga_membros_liga; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_liga_membros_liga ON public.liga_membros USING btree (liga_id);


--
-- Name: idx_liga_membros_pontos; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_liga_membros_pontos ON public.liga_membros USING btree (liga_id, pontos_temporada DESC);


--
-- Name: idx_liga_membros_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_liga_membros_usuario ON public.liga_membros USING btree (usuario_id);


--
-- Name: idx_ligas_codigo; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_ligas_codigo ON public.ligas USING btree (codigo_convite);


--
-- Name: idx_ligas_criador; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_ligas_criador ON public.ligas USING btree (criador_id);


--
-- Name: idx_ligas_status; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_ligas_status ON public.ligas USING btree (status);


--
-- Name: idx_lutadores_nome; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutadores_nome ON public.lutadores USING gin (to_tsvector('portuguese'::regconfig, (nome)::text));


--
-- Name: idx_lutadores_nome_lower; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutadores_nome_lower ON public.lutadores USING btree (lower((nome)::text));


--
-- Name: idx_lutadores_pais; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutadores_pais ON public.lutadores USING btree (pais);


--
-- Name: idx_lutadores_ranking; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutadores_ranking ON public.lutadores USING btree (categoria_peso, ranking_divisao);


--
-- Name: idx_lutas_evento; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutas_evento ON public.lutas USING btree (evento_id);


--
-- Name: idx_lutas_lutador1; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutas_lutador1 ON public.lutas USING btree (lutador1_id);


--
-- Name: idx_lutas_lutador2; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutas_lutador2 ON public.lutas USING btree (lutador2_id);


--
-- Name: idx_lutas_ordem; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutas_ordem ON public.lutas USING btree (evento_id, ordem DESC);


--
-- Name: idx_lutas_status; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_lutas_status ON public.lutas USING btree (status);


--
-- Name: idx_noticia_entidades_lutador; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_noticia_entidades_lutador ON public.noticia_entidades USING btree (lutador_id);


--
-- Name: idx_noticia_entidades_noticia; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_noticia_entidades_noticia ON public.noticia_entidades USING btree (noticia_id);


--
-- Name: idx_noticias_categoria; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_noticias_categoria ON public.noticias USING btree (categoria);


--
-- Name: idx_noticias_created; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_noticias_created ON public.noticias USING btree (created_at DESC);


--
-- Name: idx_noticias_hash; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_noticias_hash ON public.noticias USING btree (hash_deduplicacao);


--
-- Name: idx_noticias_publicado; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_noticias_publicado ON public.noticias USING btree (publicado_em DESC);


--
-- Name: idx_notificacoes_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_notificacoes_usuario ON public.notificacoes USING btree (usuario_id, lida, created_at DESC);


--
-- Name: idx_previsoes_evento; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_previsoes_evento ON public.previsoes USING btree (evento_id);


--
-- Name: idx_previsoes_luta; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_previsoes_luta ON public.previsoes USING btree (luta_id);


--
-- Name: idx_previsoes_processada; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_previsoes_processada ON public.previsoes USING btree (processada) WHERE (processada = false);


--
-- Name: idx_previsoes_usuario; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_previsoes_usuario ON public.previsoes USING btree (usuario_id);


--
-- Name: idx_rate_limit_created; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_rate_limit_created ON public.comentarios_rate_limit USING btree (created_at);


--
-- Name: idx_rate_limit_fingerprint; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_rate_limit_fingerprint ON public.comentarios_rate_limit USING btree (fingerprint);


--
-- Name: idx_usuarios_arena_pontos; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_usuarios_arena_pontos ON public.usuarios_arena USING btree (pontos_totais DESC);


--
-- Name: idx_usuarios_arena_username; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_usuarios_arena_username ON public.usuarios_arena USING btree (username);


--
-- Name: idx_usuarios_arena_xp; Type: INDEX; Schema: public; Owner: ufcnews
--

CREATE INDEX idx_usuarios_arena_xp ON public.usuarios_arena USING btree (xp_total DESC);


--
-- Name: v_proximo_evento _RETURN; Type: RULE; Schema: public; Owner: ufcnews
--

CREATE OR REPLACE VIEW public.v_proximo_evento AS
 SELECT e.id,
    e.nome,
    e.slug,
    e.data_evento,
    e.local_evento,
    e.cidade,
    e.pais,
    e.tipo,
    e.status,
    e.imagem_url,
    e.descricao,
    e.onde_assistir,
    e.created_at,
    e.updated_at,
    count(l.id) AS total_lutas,
    count(
        CASE
            WHEN (l.tipo = 'main_event'::public.tipo_luta) THEN 1
            ELSE NULL::integer
        END) AS tem_main_event
   FROM (public.eventos e
     LEFT JOIN public.lutas l ON ((l.evento_id = e.id)))
  WHERE ((e.status = 'agendado'::public.status_evento) AND (e.data_evento > now()))
  GROUP BY e.id
  ORDER BY e.data_evento
 LIMIT 1;


--
-- Name: v_proximo_evento_detalhado _RETURN; Type: RULE; Schema: public; Owner: ufcnews
--

CREATE OR REPLACE VIEW public.v_proximo_evento_detalhado AS
 SELECT e.id,
    e.nome,
    e.slug,
    e.data_evento,
    e.local_evento,
    e.cidade,
    e.pais,
    e.tipo,
    e.status,
    e.imagem_url,
    e.descricao,
    e.onde_assistir,
    e.created_at,
    e.updated_at,
    e.ufc_slug,
    e.poster_url,
    e.horario_early_prelims,
    e.horario_prelims,
    e.horario_main_card,
    e.last_scraped_at,
    e.broadcast_info,
    count(l.id) AS total_lutas,
    ( SELECT json_build_object('id', main.id, 'categoria_peso', main.categoria_peso, 'is_titulo', main.is_titulo, 'rounds', main.rounds, 'lutador1', json_build_object('id', l1.id, 'nome', l1.nome, 'apelido', l1.apelido, 'imagem_url', l1.imagem_url, 'pais', l1.pais, 'vitorias', l1.vitorias, 'derrotas', l1.derrotas, 'empates', l1.empates), 'lutador2', json_build_object('id', l2.id, 'nome', l2.nome, 'apelido', l2.apelido, 'imagem_url', l2.imagem_url, 'pais', l2.pais, 'vitorias', l2.vitorias, 'derrotas', l2.derrotas, 'empates', l2.empates)) AS json_build_object
           FROM ((public.lutas main
             JOIN public.lutadores l1 ON ((l1.id = main.lutador1_id)))
             JOIN public.lutadores l2 ON ((l2.id = main.lutador2_id)))
          WHERE ((main.evento_id = e.id) AND (main.tipo = 'main_event'::public.tipo_luta))
         LIMIT 1) AS main_event
   FROM (public.eventos e
     LEFT JOIN public.lutas l ON ((l.evento_id = e.id)))
  WHERE ((e.status = 'agendado'::public.status_evento) AND (e.data_evento > now()))
  GROUP BY e.id
  ORDER BY e.data_evento
 LIMIT 1;


--
-- Name: usuarios_arena trigger_atualizar_nivel; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER trigger_atualizar_nivel BEFORE UPDATE OF xp_total ON public.usuarios_arena FOR EACH ROW EXECUTE FUNCTION public.atualizar_nivel();


--
-- Name: ligas trigger_codigo_convite; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER trigger_codigo_convite BEFORE INSERT ON public.ligas FOR EACH ROW EXECUTE FUNCTION public.gerar_codigo_convite();


--
-- Name: amizades trigger_contador_amigos; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER trigger_contador_amigos AFTER DELETE OR UPDATE ON public.amizades FOR EACH ROW EXECUTE FUNCTION public.atualizar_contador_amigos();


--
-- Name: liga_membros trigger_contador_membros; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER trigger_contador_membros AFTER INSERT OR DELETE ON public.liga_membros FOR EACH ROW EXECUTE FUNCTION public.atualizar_contador_membros();


--
-- Name: comentarios update_comentarios_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_comentarios_updated_at BEFORE UPDATE ON public.comentarios FOR EACH ROW EXECUTE FUNCTION public.update_comentarios_updated_at();


--
-- Name: eventos update_eventos_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON public.eventos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: ligas update_ligas_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_ligas_updated_at BEFORE UPDATE ON public.ligas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: lutadores update_lutadores_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_lutadores_updated_at BEFORE UPDATE ON public.lutadores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: lutas update_lutas_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_lutas_updated_at BEFORE UPDATE ON public.lutas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: previsoes update_previsoes_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_previsoes_updated_at BEFORE UPDATE ON public.previsoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: usuarios_arena update_usuarios_arena_updated_at; Type: TRIGGER; Schema: public; Owner: ufcnews
--

CREATE TRIGGER update_usuarios_arena_updated_at BEFORE UPDATE ON public.usuarios_arena FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: amizades amizades_amigo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.amizades
    ADD CONSTRAINT amizades_amigo_id_fkey FOREIGN KEY (amigo_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: amizades amizades_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.amizades
    ADD CONSTRAINT amizades_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: atividades atividades_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.atividades
    ADD CONSTRAINT atividades_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: comentarios comentarios_noticia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_noticia_id_fkey FOREIGN KEY (noticia_id) REFERENCES public.noticias(id) ON DELETE CASCADE;


--
-- Name: comentarios comentarios_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.comentarios(id) ON DELETE CASCADE;


--
-- Name: conquistas conquistas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.conquistas
    ADD CONSTRAINT conquistas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: duelos duelos_desafiado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.duelos
    ADD CONSTRAINT duelos_desafiado_id_fkey FOREIGN KEY (desafiado_id) REFERENCES public.usuarios_arena(id);


--
-- Name: duelos duelos_desafiante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.duelos
    ADD CONSTRAINT duelos_desafiante_id_fkey FOREIGN KEY (desafiante_id) REFERENCES public.usuarios_arena(id);


--
-- Name: duelos duelos_evento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.duelos
    ADD CONSTRAINT duelos_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.eventos(id);


--
-- Name: duelos duelos_vencedor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.duelos
    ADD CONSTRAINT duelos_vencedor_id_fkey FOREIGN KEY (vencedor_id) REFERENCES public.usuarios_arena(id);


--
-- Name: evento_pontuacao evento_pontuacao_evento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.evento_pontuacao
    ADD CONSTRAINT evento_pontuacao_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.eventos(id) ON DELETE CASCADE;


--
-- Name: evento_pontuacao evento_pontuacao_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.evento_pontuacao
    ADD CONSTRAINT evento_pontuacao_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: liga_chat liga_chat_liga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_chat
    ADD CONSTRAINT liga_chat_liga_id_fkey FOREIGN KEY (liga_id) REFERENCES public.ligas(id) ON DELETE CASCADE;


--
-- Name: liga_chat liga_chat_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_chat
    ADD CONSTRAINT liga_chat_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: liga_membros liga_membros_liga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_membros
    ADD CONSTRAINT liga_membros_liga_id_fkey FOREIGN KEY (liga_id) REFERENCES public.ligas(id) ON DELETE CASCADE;


--
-- Name: liga_membros liga_membros_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_membros
    ADD CONSTRAINT liga_membros_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: liga_temporadas liga_temporadas_campeao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_temporadas
    ADD CONSTRAINT liga_temporadas_campeao_id_fkey FOREIGN KEY (campeao_id) REFERENCES public.usuarios_arena(id);


--
-- Name: liga_temporadas liga_temporadas_liga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.liga_temporadas
    ADD CONSTRAINT liga_temporadas_liga_id_fkey FOREIGN KEY (liga_id) REFERENCES public.ligas(id) ON DELETE CASCADE;


--
-- Name: ligas ligas_campeao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.ligas
    ADD CONSTRAINT ligas_campeao_id_fkey FOREIGN KEY (campeao_id) REFERENCES public.usuarios_arena(id);


--
-- Name: ligas ligas_criador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.ligas
    ADD CONSTRAINT ligas_criador_id_fkey FOREIGN KEY (criador_id) REFERENCES public.usuarios_arena(id);


--
-- Name: lutas lutas_evento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutas
    ADD CONSTRAINT lutas_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.eventos(id) ON DELETE CASCADE;


--
-- Name: lutas lutas_lutador1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutas
    ADD CONSTRAINT lutas_lutador1_id_fkey FOREIGN KEY (lutador1_id) REFERENCES public.lutadores(id);


--
-- Name: lutas lutas_lutador2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutas
    ADD CONSTRAINT lutas_lutador2_id_fkey FOREIGN KEY (lutador2_id) REFERENCES public.lutadores(id);


--
-- Name: lutas lutas_vencedor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.lutas
    ADD CONSTRAINT lutas_vencedor_id_fkey FOREIGN KEY (vencedor_id) REFERENCES public.lutadores(id);


--
-- Name: noticia_entidades noticia_entidades_lutador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticia_entidades
    ADD CONSTRAINT noticia_entidades_lutador_id_fkey FOREIGN KEY (lutador_id) REFERENCES public.lutadores(id) ON DELETE CASCADE;


--
-- Name: noticia_entidades noticia_entidades_noticia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.noticia_entidades
    ADD CONSTRAINT noticia_entidades_noticia_id_fkey FOREIGN KEY (noticia_id) REFERENCES public.noticias(id) ON DELETE CASCADE;


--
-- Name: notificacoes notificacoes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.notificacoes
    ADD CONSTRAINT notificacoes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: previsoes previsoes_evento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes
    ADD CONSTRAINT previsoes_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.eventos(id) ON DELETE CASCADE;


--
-- Name: previsoes_liga previsoes_liga_liga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes_liga
    ADD CONSTRAINT previsoes_liga_liga_id_fkey FOREIGN KEY (liga_id) REFERENCES public.ligas(id) ON DELETE CASCADE;


--
-- Name: previsoes_liga previsoes_liga_previsao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes_liga
    ADD CONSTRAINT previsoes_liga_previsao_id_fkey FOREIGN KEY (previsao_id) REFERENCES public.previsoes(id) ON DELETE CASCADE;


--
-- Name: previsoes previsoes_luta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes
    ADD CONSTRAINT previsoes_luta_id_fkey FOREIGN KEY (luta_id) REFERENCES public.lutas(id) ON DELETE CASCADE;


--
-- Name: previsoes previsoes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes
    ADD CONSTRAINT previsoes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios_arena(id) ON DELETE CASCADE;


--
-- Name: previsoes previsoes_vencedor_previsto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ufcnews
--

ALTER TABLE ONLY public.previsoes
    ADD CONSTRAINT previsoes_vencedor_previsto_id_fkey FOREIGN KEY (vencedor_previsto_id) REFERENCES public.lutadores(id);


--
-- PostgreSQL database dump complete
--

\unrestrict DYBHOJCpHBQ7oFH375TvkzgPm3egTI15AYDMadM90RhxUP63CzrQTGtRBYWIoa3

