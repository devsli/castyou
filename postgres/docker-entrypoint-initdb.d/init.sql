--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: castyou
--

CREATE TABLE alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE alembic_version OWNER TO castyou;

--
-- Name: config; Type: TABLE; Schema: public; Owner: castyou
--

CREATE TABLE config (
    key character varying NOT NULL,
    value character varying
);


ALTER TABLE config OWNER TO castyou;

--
-- Name: items; Type: TABLE; Schema: public; Owner: castyou
--

CREATE TABLE items (
    id integer NOT NULL,
    title character varying,
    author character varying,
    subtitle character varying,
    summary character varying,
    image character varying,
    filename character varying,
    length integer,
    type character varying,
    guid character varying,
    pub_date timestamp without time zone,
    description character varying,
    duration character varying,
    explicit boolean
);


ALTER TABLE items OWNER TO castyou;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: castyou
--

CREATE SEQUENCE items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE items_id_seq OWNER TO castyou;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: castyou
--

ALTER SEQUENCE items_id_seq OWNED BY items.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: castyou
--

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: castyou
--

COPY alembic_version (version_num) FROM stdin;
74b39fe8d4b1
\.


--
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: castyou
--

COPY config (key, value) FROM stdin;
title	\N
url	\N
language	\N
copyright	\N
link	\N
subtitle	\N
author	\N
summary	\N
description	\N
owner_name	\N
owner_email	\N
image	\N
category	\N
explicit	\N
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: castyou
--

COPY items (id, title, author, subtitle, summary, image, filename, length, type, guid, pub_date, description, duration, explicit) FROM stdin;
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: castyou
--

SELECT pg_catalog.setval('items_id_seq', 1, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: castyou
--

ALTER TABLE ONLY alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: config config_pkey; Type: CONSTRAINT; Schema: public; Owner: castyou
--

ALTER TABLE ONLY config
    ADD CONSTRAINT config_pkey PRIMARY KEY (key);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: castyou
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

