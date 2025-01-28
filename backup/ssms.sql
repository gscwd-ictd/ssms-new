--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 15.10 (Debian 15.10-1.pgdg120+1)

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
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO admin;

--
-- Name: roles; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.roles AS ENUM (
    'support',
    'user'
);


ALTER TYPE public.roles OWNER TO admin;

--
-- Name: status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.status AS ENUM (
    'open',
    'closed',
    'ongoing',
    'cancelled',
    'resolved'
);


ALTER TYPE public.status OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: admin
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO admin;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: admin
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE drizzle.__drizzle_migrations_id_seq OWNER TO admin;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: admin
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.account (
    id text NOT NULL,
    account_id text NOT NULL,
    provider_id text NOT NULL,
    user_id text NOT NULL,
    access_token text,
    refresh_token text,
    id_token text,
    access_token_expires_at timestamp without time zone,
    refresh_token_expires_at timestamp without time zone,
    scope text,
    password text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.account OWNER TO admin;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.categories OWNER TO admin;

--
-- Name: category_assignments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.category_assignments (
    id text NOT NULL,
    team_id text,
    category_id text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.category_assignments OWNER TO admin;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.comments (
    id text NOT NULL,
    user_id text,
    ticket_id text,
    details text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.comments OWNER TO admin;

--
-- Name: department; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.department (
    id text NOT NULL,
    office_id text,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.department OWNER TO admin;

--
-- Name: division; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.division (
    id text NOT NULL,
    department_id text,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.division OWNER TO admin;

--
-- Name: office; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.office (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.office OWNER TO admin;

--
-- Name: session; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.session (
    id text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    token text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ip_address text,
    user_agent text,
    user_id text NOT NULL
);


ALTER TABLE public.session OWNER TO admin;

--
-- Name: sub_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.sub_categories (
    id text NOT NULL,
    category_id text,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.sub_categories OWNER TO admin;

--
-- Name: support_types; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.support_types (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.support_types OWNER TO admin;

--
-- Name: team_assignments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.team_assignments (
    id text NOT NULL,
    user_id text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    team_id text
);


ALTER TABLE public.team_assignments OWNER TO admin;

--
-- Name: teams; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.teams (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.teams OWNER TO admin;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tickets (
    id text NOT NULL,
    requestor_id text,
    category_id text,
    sub_category_id text,
    support_type_id text,
    details text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    assigned_id text,
    status public.status DEFAULT 'open'::public.status NOT NULL,
    assessment text,
    action text,
    cancelled_due_to text,
    started_at timestamp without time zone,
    resolved_at timestamp without time zone,
    cancelled_at timestamp without time zone
);


ALTER TABLE public.tickets OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    email_verified boolean NOT NULL,
    image text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    role public.roles DEFAULT 'user'::public.roles,
    office_id text,
    department_id text,
    division_id text,
    "position" text
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: verification; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.verification (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.verification OWNER TO admin;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: admin
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: admin
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	2fb42a3c9879f4614baccde3839299092752f94ac55b7281b3478eccb04da4f7	1735826036279
2	3ac3e5e5c4e568edc42da173b042eb02bdafed7c8e13a7cb171ae3ec56147116	1735836078499
3	2605b0fc6bf046490532de1ba705f0f1ca7d36b043aa6c7831bd6deb63de4fc9	1735838824052
4	575347bc2ee9e16ef46cf27ab6c39c7d2c0385d43a86697b15b31d393d9e46df	1735839724946
5	3417b9d340b4c4aa443667c382ff49efe184d8d8981f28554a52c5e272820710	1736144208098
6	e2aa34d32974c5792a1070f06aa1db4e847c4b7ce1dc39b3e61e29d25c184252	1736149733968
7	bc208f4fe0884b6eb83e97c9ca9dbc282b9e962d2a06f75f29947f5cac28ef89	1736175899993
8	fc2c7443ff686154e76aad930c0ed13153e614becbb6ace6fac03bca690b6b01	1736493743746
9	62e06d9cd1ea3ef23756b7252ac9b28aa46d3f79185d5e764527d24c925ee7f8	1736741646362
10	bc38b3a91b5d1d2925c0011774eac3208b93bb7bf29fccc91d948f1d477affb4	1736830590241
11	a4cf489d6941af27a3f987ed588ed208a5103d9ae58e4d88fe5e64fe655ec093	1737333852257
12	1d824e3e16178dbe9a8ffe2ac9a038fcbeb9b1fe4c2184b6238e64d7df0b6ebc	1737336306369
13	bc38b3a91b5d1d2925c0011774eac3208b93bb7bf29fccc91d948f1d477affb4	1737336384503
14	1d824e3e16178dbe9a8ffe2ac9a038fcbeb9b1fe4c2184b6238e64d7df0b6ebc	1737337151162
15	1120d33ac459da2a252bec74d61abaa4fd5425f13b4ff08667cd4df386c64098	1737337646144
16	bc38b3a91b5d1d2925c0011774eac3208b93bb7bf29fccc91d948f1d477affb4	1737337730748
17	d327023368a6a1067e145d632c436ccc5d06a379dd0028d966b34def4b874525	1737359066598
18	463b2f2609d88d9c43f4a8d4c4cafc9613abf1971608aab8580f53def79b4a44	1737360261474
19	e6dc0909056ba28001771d0a406ee2a097a2b3206b8611c7da21fd15c5ca4b42	1737361878849
20	053405c50182a8625a90b84b9124cc639296dc8f5105e512fad4c6a4583fe87a	1737362040784
21	593d4a67d18faa12c0ad3be97bc8447818f232159ff49ec88923f0f6b8c63c7e	1737362378194
22	a5742b01690748c4c326821241c28d8ca72589fa159fb505a26349fdb279bb9d	1737362681959
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.account (id, account_id, provider_id, user_id, access_token, refresh_token, id_token, access_token_expires_at, refresh_token_expires_at, scope, password, created_at, updated_at) FROM stdin;
LSenh6et1k6IXr9lOQFtH8ekbOHSJHgn	ZkZGxPjDI7W4BR9urJ2wHj5Mzc4KVunN	credential	ZkZGxPjDI7W4BR9urJ2wHj5Mzc4KVunN	\N	\N	\N	\N	\N	\N	b3e716de2965473f47c699237c94fd2f:9ababffbdfb84991f8d58a701852b7ddbed890e10b3a80b725ada7a3ea7078decc8889b943144998c610b8c01e1ac782f2bbad7c5983d7daf9f97b4779b02da2	2025-01-28 08:20:51.332	2025-01-28 08:20:51.332
j73mY4sfJdAacA64ZcASiAYadtJCLIgm	GxagVwlU0m28JJWwJgbG5PnClyvnBtIU	credential	GxagVwlU0m28JJWwJgbG5PnClyvnBtIU	\N	\N	\N	\N	\N	\N	627835ad4824aafbded4a0385089b079:7a164892fe520780e8d25a562084b555de1655d782e0def7459d077f8c0b36b5eabb3600bdf67ccfa5c6f16036342558a1776f1125b0f9610392154c157619b8	2025-01-28 08:20:52.362	2025-01-28 08:20:52.362
0MClX2r7khbgjALwsdw5pAG1rsgfl1Lh	DaeACknxGUH6NusRguwhLLuu2d5QUbQY	credential	DaeACknxGUH6NusRguwhLLuu2d5QUbQY	\N	\N	\N	\N	\N	\N	ad7a17c77e9fec9ee66e6db696d8532f:3d7c2acb1fc237ef56f779ac217fd45733aadef52d5a189f657d0d9a66a8717194f2f7626578fb5d03ebc614bec0eb0f0252195762e7bbcef1614ffcf4b35c50	2025-01-28 08:20:53.333	2025-01-28 08:20:53.333
GXrc98JRXtxAyk6ZzOi6hBCAQLddmylz	aB5YCt2pHi0uakHQ8SrVuUxMFvFlWODe	credential	aB5YCt2pHi0uakHQ8SrVuUxMFvFlWODe	\N	\N	\N	\N	\N	\N	c4f8f39b9b18ee1d79ee488db42c53af:138c397c3b0de8d4295e995cc1d575a80c141190e34233d45eb122755e1521311c8caae746f9372e9c2ad606012522d09d239c6c483e081490a6ef4ef1e6dd32	2025-01-28 08:20:54.324	2025-01-28 08:20:54.324
dUedoSHD1XKabw5S6Ey66XgabQA7yeUO	Sfcf52QLeJWY4QbZsF9xMtB2GcXYkWmf	credential	Sfcf52QLeJWY4QbZsF9xMtB2GcXYkWmf	\N	\N	\N	\N	\N	\N	104b6e29a1c5c6e57d5aca2de5aeac82:29ed9c6479f564805b17cdf35158fa710ae1a1e178225d50f5ca7fe3c433bd3ddb3b47f2f157e47e5cfa0e22fa5e65b080211ad6ddd4bcf8ce90d80cd767d97f	2025-01-28 08:20:55.341	2025-01-28 08:20:55.341
rdCD9yebcfQx9e03oXciyNmLGqfDPBOp	AlGhfhRtdMh1bqmXrEYj1Qm2DtE0vsId	credential	AlGhfhRtdMh1bqmXrEYj1Qm2DtE0vsId	\N	\N	\N	\N	\N	\N	42ba5f8102052d8b878cfbbee2c37145:d367fbb52b73dd32fc9ff2787ca7e92ad58eb112b7e5611604d50fc6d5a4d04e450ba41c8c9dffd46e2c63e2472048ab393f4480203bc8e66de182ad0f383b27	2025-01-28 08:20:56.472	2025-01-28 08:20:56.472
cULihQd44SHDl4X14keiIOgScclBUSZr	5xu9mwV7eHvbloEua5avHStG0jKu2Ggg	credential	5xu9mwV7eHvbloEua5avHStG0jKu2Ggg	\N	\N	\N	\N	\N	\N	533c3475a3c7064e7efa2f7df06729d9:9ed889f0df0be7a4c1dce53baa80b48a7434c11ba3996e3dcd7e53e5f73392bed59861fe75b3ce9a7eb283253fef67f5d60a422f43977175203bc70cbdd7d371	2025-01-28 08:20:57.573	2025-01-28 08:20:57.573
vqe0A6hicIbSKgfUC9gqK9mBl7d21MFT	Bun2586jHvNmdw1AWNCCrVrdgj8UzJAn	credential	Bun2586jHvNmdw1AWNCCrVrdgj8UzJAn	\N	\N	\N	\N	\N	\N	b53f3b18168fdb2dba155a76e8079e6c:716ca43f940689180875d96744b800e7ba14b052e75756036926fbcee87ab09c30902d52f1ea60f9d5600b6e97033820b0d3b56d3cc589645ac3270380614f80	2025-01-28 08:20:58.732	2025-01-28 08:20:58.732
jHaib5oiwAQ9bDcVMTRB28zyj9XzmDIR	U5o7KCBc1XjF1h75tq4CMgxNHeabHzuL	credential	U5o7KCBc1XjF1h75tq4CMgxNHeabHzuL	\N	\N	\N	\N	\N	\N	b137b2128c6357a049ccb0bdb7692284:812d1621f875d1adfebac0ddf2f8486a329de6c871b7da5fc4f7612b14742b7bee76e1dd88ee0304f0a5b845e7fb4243ccb4b6d8940d0cae6b8d894e593b8cce	2025-01-28 08:21:00.237	2025-01-28 08:21:00.237
4DcNXeLQmHMFhrkYtJ3csiNZn30hNAMz	fhzA9xqcvSmYPGki0cy6xhU4vF1RaMlf	credential	fhzA9xqcvSmYPGki0cy6xhU4vF1RaMlf	\N	\N	\N	\N	\N	\N	ee1b13bb674b386bd06a4d6c01624de7:c768761301cf3536ef9ca9e19f1294db50214e83019ab8097c681f053b6ac1d0ab514f1606b8531f0a8216405d850d59adab34e948df4aebec8259b42249612a	2025-01-28 08:21:01.918	2025-01-28 08:21:01.918
WqC92ur1jJctoQKkdxUIP7PAbqYyFqrr	WNSuxNPgv9llyVX5lP62iDGP7W90y6M0	credential	WNSuxNPgv9llyVX5lP62iDGP7W90y6M0	\N	\N	\N	\N	\N	\N	eff0bd0ccf197133b2e31353ddfe6568:51b2a6361eb536aae833ed8256dbe34d932a3b9e39402ec1fb843ddf2b294ee52098a401ea81c525ea96d6039549f3363e03a3b26e61d057bc263ae872a8be80	2025-01-28 08:21:02.965	2025-01-28 08:21:02.965
cbeYiaeXqZBfIExG2KrrKYwYWfjzsaDa	MVPoXGOG442vJVwGnjg0Us1z6nLaZ2ZS	credential	MVPoXGOG442vJVwGnjg0Us1z6nLaZ2ZS	\N	\N	\N	\N	\N	\N	b5b8259d270487c25fc0e682fbabdee3:f8392bd95c14cc92651c3f19805d76c7054088a0c9abfa62965950c2c7b773ae8b2878c863f4bdebf2a74e147e940ab0f921636136ad738d9d8effedbb0ade3c	2025-01-28 08:21:04.299	2025-01-28 08:21:04.299
ee1ksSb425JBds4BuNi9KFaGUcHA9oAF	ADQhInRcAxyUTruOLypvLbdSPh3GPEoa	credential	ADQhInRcAxyUTruOLypvLbdSPh3GPEoa	\N	\N	\N	\N	\N	\N	08254e9215466f70e4f59335f7063ce5:1b1a784cd8ab47fb459bb86912b23da9c2291df299ce659715777d51191a1c88de9816a9824849431036ea52aae8eab4373773f250d8e991b96e5cfaa7c73a19	2025-01-28 08:21:05.309	2025-01-28 08:21:05.309
h7mHux5piSC2ZM4ZWl5RsUPxE1wedFx0	ncnoO0s18rKRlrEYJ4FbcR02qFjkMvkr	credential	ncnoO0s18rKRlrEYJ4FbcR02qFjkMvkr	\N	\N	\N	\N	\N	\N	e0cc067cdd943041b85a00eaf77546eb:81d21713adb1b28deec749e699b41df421529bb6b05823e2ace00d488adb334ec168f211841de99f2b106c2dd4455a0cdc06bc386528aa8419daa2a025d9222d	2025-01-28 08:21:06.512	2025-01-28 08:21:06.512
Zg8BtvSdrwsuAtPRZNbx7NJAgTL8CsFS	SavV7FLpQulzIVUqFjWFS0BKuAEqNcIo	credential	SavV7FLpQulzIVUqFjWFS0BKuAEqNcIo	\N	\N	\N	\N	\N	\N	9d24cb81cd31c7427dd392ce0cec5856:2cf6f8eb183284745db9a2eee4e8a9ed3e6833d3c08266dc0f3d74e94765f217db6fa488cdee51e82096d9e946b4a6d7b731caed2957dae2c9425a669121b4b9	2025-01-28 08:21:07.827	2025-01-28 08:21:07.827
8KflQE37hq0q6desqPlNQettHWSnaREm	dhy2mU2H94u99xBuqB6E1wKTd8wVOVEp	credential	dhy2mU2H94u99xBuqB6E1wKTd8wVOVEp	\N	\N	\N	\N	\N	\N	ca96c02c8272a4152f88752077740a32:95ad923529ad5f93f4fa804b51db7551b627aa539190a8048c318a75192394579aca1cdd115c7399cd04172ca26b4fcd63c54a7b7bed5b0627a8d57ed32e9967	2025-01-28 08:21:15.303	2025-01-28 08:21:15.303
FEKiYjJapOg2LRLIzh5aHVcp1NmGzTUk	DvFtHWmERhE8m0CYI0QPDVeat3RBfbFK	credential	DvFtHWmERhE8m0CYI0QPDVeat3RBfbFK	\N	\N	\N	\N	\N	\N	8d05f25eeabd74c5143da44e43bcac74:933de81c72a36a9e188e8b0db9baf9a33210e30dc37b3da7a0d6d7f67e961310cd24ecdb1609864194b7a5cf0e992a9c2e607e16355b581fe35bb610685d8175	2025-01-28 08:21:28.187	2025-01-28 08:21:28.187
benn3TQ9ArkuaT2PkEKZHlKFVs2a4xnA	a8JjLmlGYb54xoW7dPdDeXHAKF0bnjQp	credential	a8JjLmlGYb54xoW7dPdDeXHAKF0bnjQp	\N	\N	\N	\N	\N	\N	08321a6d02dd1429af510bd8f44dddc9:732c045d74065dfbfe12dabf364338865a6dcf0e1002378a503ac918f93169cb370299a41ffa3ca888cf891cc173c83c655d072ffd67df160f74a3e94a9e9311	2025-01-28 08:21:41.296	2025-01-28 08:21:41.296
0mxnmAjC7zUBonvycE2xcxNXAzJGvKV4	9K7cBMnrtkHBZJXaeiJkZymjAAJj3oiM	credential	9K7cBMnrtkHBZJXaeiJkZymjAAJj3oiM	\N	\N	\N	\N	\N	\N	87a90eb6cf27ed36fada12035fd9bb55:e59420cb2186e7f8f2a344e01289370a0a3309f9beb3446bf1427d44f7eed853ecef4c1108236049788019ec47645a72f6034aac8afeacf542ba717818448db6	2025-01-28 08:21:52.33	2025-01-28 08:21:52.33
jTgbg8BsebX1i19A0Fb4d2zI4CBXYOx6	lEjfcqVHnkNJfaLuxhuf4rEPTX6CV8hf	credential	lEjfcqVHnkNJfaLuxhuf4rEPTX6CV8hf	\N	\N	\N	\N	\N	\N	26507a14671bf913111129fbb3b38cc6:67bd84ad41eca366598a5508e2a9dc83f1ba2d92e74883ff4a172df83c337a61a9636547cdf04d20700e9421a470117afeaca2278af72787f9a16c878682e8ab	2025-01-28 08:22:03.798	2025-01-28 08:22:03.798
jIuHdycFFtZgEL8wXYenhkYkECdY2hSS	Na4PetRe2mFO8XQt4pnur4IJenr2hWeW	credential	Na4PetRe2mFO8XQt4pnur4IJenr2hWeW	\N	\N	\N	\N	\N	\N	8b99da9d6fa201dd9bbadf4e81ba9fd0:90123fcfbed9954fc5252f5f5325e0bb846fdabed3d58e7cb26f6917633a0b2be35d876cfc6353ebfe32cd797f2f8151f7f681b772d71e88c691db8bce36c1c1	2025-01-28 08:22:18.908	2025-01-28 08:22:18.908
zDnSY5e3W3bPoejO4k4e32Ktk3tDUH0f	2AkQ0NZlRyDhZTrChrVPnpEwxRYmq0LB	credential	2AkQ0NZlRyDhZTrChrVPnpEwxRYmq0LB	\N	\N	\N	\N	\N	\N	e3c23375c784166fdc0a1e1ea284f656:4910474881bd722a820a965781183409e950eccb6fc2ec1b929c6a6f5beb120f9a6df0b1eb027a5e0d2cdc6f8fb4417a59ec99cf0d965126b5562a87ea701f77	2025-01-28 08:22:28.938	2025-01-28 08:22:28.939
AkmTNtw69emEv3pXAsmESWtbS10ePyMe	txzt0C4Y9D7Ooe8dZpbvIRbThgXBbdIc	credential	txzt0C4Y9D7Ooe8dZpbvIRbThgXBbdIc	\N	\N	\N	\N	\N	\N	9c304a0fd96b17a58ab7ae0c34bade6c:528e08c999aea17d06119cbc9d36ba5a17959425d158976af77ba113f1890bbc92a6f62eac983d3cb8399911345cc1453d2c41400058e050c85f9be4ace01d66	2025-01-28 08:22:40.173	2025-01-28 08:22:40.173
LFRXgJXw2cU3bG8O9L3g8N8ZGb6miNxS	cJpJt2N2voNSZ9FsBn0dpnAZHbwD2Q0Z	credential	cJpJt2N2voNSZ9FsBn0dpnAZHbwD2Q0Z	\N	\N	\N	\N	\N	\N	c1339d86cfcf68469df19c9b11370979:3a358d67b24dda7bf6c2671eae30eb3aaf7037acb7f9ad2879ea5f8443cbc795b9afa083e86ff0a0dababb496c5b0ada36326c6dff63898ce151e40e6f62acc8	2025-01-28 08:22:52.729	2025-01-28 08:22:52.729
Bsm3OLiAe7c4JRHIeE3qfyRQ9Evwkcc5	TWwNrMaA6ceVi0pwG3jY4rjOHqQriKMr	credential	TWwNrMaA6ceVi0pwG3jY4rjOHqQriKMr	\N	\N	\N	\N	\N	\N	05581158902b1520fcc8027922c8893a:08d77400022834cad1c2a6ddb343e6ae1f9b43538ad71799d2d14f4d84a02a8c296d4cbbee616799ec92bbd4b5af60d66a72478de5373033ea4afa1845e1a84e	2025-01-28 08:23:05.913	2025-01-28 08:23:05.913
VASi1htCEybFaRWHShZNMPCSUS2umNLt	v8UFvvZ6j4SdeQOmBIgFZuwr34ECPv6L	credential	v8UFvvZ6j4SdeQOmBIgFZuwr34ECPv6L	\N	\N	\N	\N	\N	\N	19afdbf19938543b576b24e07571e163:989a31c3982d888bdbe03f02e4fe8036b5813a634cc53d4bd42c2b526b8f256a1a8ccea89eac05416c6978baeabdc6d87cda6c2c37ade1c031dae9e6a985c817	2025-01-28 08:23:17.083	2025-01-28 08:23:17.083
LJFnclc4SzLnGT2jxIg2SbF0yj2UHrD3	EMmeXoLAyezcYz13ZBddNnTR5TREo8mj	credential	EMmeXoLAyezcYz13ZBddNnTR5TREo8mj	\N	\N	\N	\N	\N	\N	f58466c57af4c11a09463a0760306c41:c7369d28fa3f3b3c6aabafece190c16951672a429b7d41b5208f511c82fa4326c57bc0204b0ab668ada42ae0aeee9ff6eab05b667f73dde751eff8a969654269	2025-01-28 08:23:29.929	2025-01-28 08:23:29.929
J54HFnFoNwdab5kB7QH9SJF1EbGVmzgG	5dfLs3DGEGvvBQq27q3pfpvlw3UC0H5S	credential	5dfLs3DGEGvvBQq27q3pfpvlw3UC0H5S	\N	\N	\N	\N	\N	\N	92330cf0cceac00f052e29a0f6386827:bad1bb87b130d9d00a53b57effb35790491f414a8aa4c9a2e3e19e932df8114ed69979a330d76fdd93dcfb8f119a98bbd6d7a5ef9f88b634b92440d8acd5f09a	2025-01-28 08:23:45.199	2025-01-28 08:23:45.199
kIpLd66azfGvdFY5R4OCmWxeC1TeFxhs	dgzQMss9eafQYuoK9X3q0mPj4zwcsAib	credential	dgzQMss9eafQYuoK9X3q0mPj4zwcsAib	\N	\N	\N	\N	\N	\N	5d7e24b3157978d48f94c0f767fcd20e:eaf073f80e561c5747909b7482867f3b0d50476ff7517f33a23fdb328a86f571df4e70f0910c803293b2a3991cb0344ebc80dda662f53ef3355d5a3a3c4ac5b7	2025-01-28 08:21:09.031	2025-01-28 08:21:09.031
2b5I4C0rHhuZPzUVAlD6PBldewXvy4Io	Eo1gaLjeZSNREzuw2h4I7TGir39geajS	credential	Eo1gaLjeZSNREzuw2h4I7TGir39geajS	\N	\N	\N	\N	\N	\N	7d8f9448942caf63abe3f3191f15998f:f9e4ad7565dde8fcdbbcccd7d8aba22aa9c7ed5ea19a6a185f1c9ab48e659c1f9eec396d984954db391e9f412f94df2f389a43c22417c0078d031d37978cad78	2025-01-28 08:21:20.103	2025-01-28 08:21:20.103
DNUQodHHTnDbmGpYfLoCgMNsFqgNq0xx	5h9qX2mspqeRiuRxwcaOs2mEABh8pscA	credential	5h9qX2mspqeRiuRxwcaOs2mEABh8pscA	\N	\N	\N	\N	\N	\N	ca3c7fca6b341b5bff967b6f8ea7060d:7847862edcdf9f07b635dc6817ed768f90a8a2d82b6e54d62ba052a62d45d9f34b05b88b728e6c9fc2aaf53d8f6a634412b81927a86252df9fc24356282b67bc	2025-01-28 08:21:34.818	2025-01-28 08:21:34.818
MOrR19TTt23nblnlpIGv8m0atgQefhUT	d7Qm5YNpfrCbEhWBYvd9d2SfmXWnNaP8	credential	d7Qm5YNpfrCbEhWBYvd9d2SfmXWnNaP8	\N	\N	\N	\N	\N	\N	62835afd77bbbfa5b2cb3216a8988b22:68c220c1f1618d8e52a286106b7bae2bb0bd1c8a55dbf83c48a9e2c51533587613068fe59b22e7cc44115086f6309d304fcc3cebfca550eb82573a6543b985b9	2025-01-28 08:21:43.659	2025-01-28 08:21:43.659
unW8myJ08T2Xy8qJllx6c4UXwNqBvund	BkA8h99uJ58MV1RXaiCnhuF1FIoaYoaL	credential	BkA8h99uJ58MV1RXaiCnhuF1FIoaYoaL	\N	\N	\N	\N	\N	\N	89c0fd39f41e2f0699d412920e563aec:debd658371249a94dba4b74773a8bc2849911cc4f74b3215bd8fd172f4a314a3e976d5cf2280c53d766d90fd59f6098910aa7aa98d494b8ed8980a7f87b76609	2025-01-28 08:21:50.416	2025-01-28 08:21:50.416
0lnhDyTV45DG4Npw0mO01htZ1kVSZcRU	7uuufi7iwmMTGoIImNu0HeLntAQPBFdT	credential	7uuufi7iwmMTGoIImNu0HeLntAQPBFdT	\N	\N	\N	\N	\N	\N	1ada1f97e6014c955711f1a604ac72f4:2c3b2a9361698bd3169142d3633c876debdf466bc2890b573ace22a6d3f745e5e6d7903342770ba13e3efefe24d3e174e9367cc0a7e3f01ae157d506b7d010c9	2025-01-28 08:21:55.449	2025-01-28 08:21:55.449
MeeqvmKTSZy5uGRwz0PfxpiDPk20pZlv	BnhgPmzf2AjyxCautMUVgEX1SxDmO4gb	credential	BnhgPmzf2AjyxCautMUVgEX1SxDmO4gb	\N	\N	\N	\N	\N	\N	b798d62cdeda203cd0b6d1cc6f0f86dd:8183ca0af315d78e5dc0fb5d6e8ed8cdbfa67085379f3bbba4ae34adb96167566e061ed6cc7495b2dcb33957eeab3643aa42dab787eefe8c361e4fccd3c4863b	2025-01-28 08:22:02.65	2025-01-28 08:22:02.65
j748fTyaBAejI01e8PRWjtOGiJjdgLFK	UHchoEpdBp0oWbfxGsuwyiZriorernxQ	credential	UHchoEpdBp0oWbfxGsuwyiZriorernxQ	\N	\N	\N	\N	\N	\N	710c6d27e7c27d490aac76b63c8c804a:f10d3be56d2895ee88cc2abebae80129c63ac726a3c5f9a9e5203cb85d3d813e4c7ad429c6fb4b6e62c4999096fc95dfbc1b97532e137451bf993476bd42b78c	2025-01-28 08:22:08.566	2025-01-28 08:22:08.566
PVgUcXayY6iCtkSALqXUmlyLU9nG97kk	wqFMxecXBdDGXkJboa3NXNHvaZ4tliOg	credential	wqFMxecXBdDGXkJboa3NXNHvaZ4tliOg	\N	\N	\N	\N	\N	\N	da651dcde143581040ba980656e7223a:7f17cd71ff1215336a54660490feb627b4d36f4d72e99818915558f6cf2fc0fc879709073b4add80a3d7ecd2fb7ba03f8d44c0df57823b2a4632d8c15f0fa097	2025-01-28 08:22:15.246	2025-01-28 08:22:15.246
BLCPqxHjLI8DxEG1IvXUfInc5vsD2OIQ	jr64DbzEmVx7irWFNcfytk2JxwcLy4FD	credential	jr64DbzEmVx7irWFNcfytk2JxwcLy4FD	\N	\N	\N	\N	\N	\N	50a54d07e3873bc805011b2f60c376f6:393fcf96243c57418f167049b3feda3722f685eebad2bd5f8bc24f15762fef88d0f818ecfbc646ba9c77199a25f3b1e3830d17fbf77a6df809e0999037f07d59	2025-01-28 08:22:27.989	2025-01-28 08:22:27.989
iEn9hGHXphI1WKtmjbfi7VNfZNDOs0mW	tmn976ya6z0TZOcGA18iiqxkmy41ZTy0	credential	tmn976ya6z0TZOcGA18iiqxkmy41ZTy0	\N	\N	\N	\N	\N	\N	88a39c8fa940a67a929c2c83ee630288:97b60ad4380f2dddbfe967b1d41c9c7090ecfebc9daa9a0f3318026daba96f65217e10b28892bc6f91241f689da9f7e116e808622c23ac87c287defbec7d2ccb	2025-01-28 08:22:41.281	2025-01-28 08:22:41.281
1YjcY3uGTivZbVbmxB70w21AAW6jUsVC	Pliz1HpHbTS1OfVopDjh2poAjGRAU2kN	credential	Pliz1HpHbTS1OfVopDjh2poAjGRAU2kN	\N	\N	\N	\N	\N	\N	06d10c73edfaae69021456399dcf3b5a:f9bd1d79f81c8914c1fc99524ce5b29f96fa2d5989f97eb51acde822e8e6f3dccc09aee6619befea0bc07e7ac979a7065540aa9b08b9ce3d4231dd53674a47d2	2025-01-28 08:22:53.698	2025-01-28 08:22:53.698
haeGnhbX8zc7q3y5UponmddCKOHxJfxd	DlLUJRz30VpcIfJVGOJC8FjecoEVPTrI	credential	DlLUJRz30VpcIfJVGOJC8FjecoEVPTrI	\N	\N	\N	\N	\N	\N	4297fca560826ff71a3e44ff9aa478dc:8ef968e9917d61437b19ae2c2720ed29928d0807d554323f723127adbac9eedb6a5275827513b2cb02002526fec7eca47e645e7346ec6f7674d5df43f13b120e	2025-01-28 08:23:08.199	2025-01-28 08:23:08.2
pOLFfLUoW7Bfi2JCsTXMSB2eshKETyJE	g8mnyabQhC2qhNUbhGMwO8ZvXXV7UriD	credential	g8mnyabQhC2qhNUbhGMwO8ZvXXV7UriD	\N	\N	\N	\N	\N	\N	d8d6cf1084a98167769bb1c78ada2550:91b2479243fcd001622dcb20e5ad0225d8192ef827bf3844d97275168c73ccbca9c6873d601b84df0b37cdeef4711479fc1965ac0f83e70f0dbc5c961dfa94d5	2025-01-28 08:23:18.601	2025-01-28 08:23:18.601
TVYTeUdowMSZtD9Mxmd96DR76PB7T8v8	x1PPZF9VhX2XGBRTISO7KYuZZHfEuiOj	credential	x1PPZF9VhX2XGBRTISO7KYuZZHfEuiOj	\N	\N	\N	\N	\N	\N	da33f0a24c8475d336bda3475c9a98a4:e0416553fe3efe9cda6c4358681351ab740896bc79a9999b32a5bdfa5c276ef8acf0aec061e915eab72a0798ad0f9ae7f331cd716dfdd289a7eff0d1f9edaa13	2025-01-28 08:23:26.059	2025-01-28 08:23:26.059
Z0kUtpVwKyiz64zolcDVrgq1EQBC6GZc	WHYHf6QUnvoXjwBeIOOz64cRnNic8HpC	credential	WHYHf6QUnvoXjwBeIOOz64cRnNic8HpC	\N	\N	\N	\N	\N	\N	c8ddc90f7097d8d08f08d6e00d9f73e9:559bce087a767987a356e7fa67b99be5fd90c5a9520c3a6cde6b551c2a8550184e34f49f2f4f439032d55330c97d0382be6ad8c77780402103e79b3d4ef814ca	2025-01-28 08:23:30.883	2025-01-28 08:23:30.883
RBuHcLeRU2kvVL49eWEMUbsY7mRaqZ3c	ez3LvpZtw3YlYKBZS5G29bKC9aGeThsc	credential	ez3LvpZtw3YlYKBZS5G29bKC9aGeThsc	\N	\N	\N	\N	\N	\N	9bfde228536a6d2daeb34a9de50f7f53:272e5b30a1b70e7ccd2a2d669b9d96cf387f76191c7be880d5686c379c9dedf98457779c655c6dc6be1d7e09e4af29f39f51dc2ff6ed82296b04f96d333f5236	2025-01-28 08:23:38.782	2025-01-28 08:23:38.782
0tJP3Ejet9qdO8MxdffF0hnina5Fk8aR	P7OjXFmnZFVN8QRtMb93fH5ie3pkzvPU	credential	P7OjXFmnZFVN8QRtMb93fH5ie3pkzvPU	\N	\N	\N	\N	\N	\N	90214959401bc922ab85c9318bf1efa7:6a44fc8abf577fd619161017fa01d39255429a74574e85cc6003dfd9752350ad2331d3420704b5beba25925dea912a25b3c254229703ec092f58f5216cad96c9	2025-01-28 08:23:46.314	2025-01-28 08:23:46.314
GugBWwk9718DGsHpfKWkBk2OwbvVkPIA	UnIOIOn4ck24q7wkxX7obf6bgBpW97Pi	credential	UnIOIOn4ck24q7wkxX7obf6bgBpW97Pi	\N	\N	\N	\N	\N	\N	7ad3032f80c905b9a940b6584d4ef065:4bc92a3ccebdcfa05054f66ac52a15b8c9dfa2cdcfba6df239d1d70bd508335944c359c2dd83abab13ec3e037059288c771b535482b7f6b50f885da59e866ed8	2025-01-28 08:21:10.107	2025-01-28 08:21:10.107
YxzkUWlbSl0jkbAi1QZJkWdfjvlBrtVL	EOGLfXnjhMHTEBK3WcgLUwcDFuRToOY1	credential	EOGLfXnjhMHTEBK3WcgLUwcDFuRToOY1	\N	\N	\N	\N	\N	\N	879ec188baa0edeae5cf80683c09b057:294a794a130461da5e1f4e3b2541491ca3c2b378223e4558e4acc9be86689a705994d4e82824371883b5cc5322238574e09de71d26d2c016944951411de62511	2025-01-28 08:21:16.261	2025-01-28 08:21:16.261
se8ebBJZc0wiLm3T90EFo2uubBBkihAr	GiHghnLHmIL1Ba85FEJRnVCcncrpkX4l	credential	GiHghnLHmIL1Ba85FEJRnVCcncrpkX4l	\N	\N	\N	\N	\N	\N	215f87f21a62c8f5a670cf6374325ca3:95b7548325fcf0f48dbae7fb6fc6a7d0cb713acf3c3f1d1a4a24dbf15de6347a3301ac14c3340180987c45b3ff4822ebceb1c4fc6df33bc6ecf662d6a3ece629	2025-01-28 08:21:26.032	2025-01-28 08:21:26.032
dvfXllKPcO47qnoPcvQuzAUpN0uOXpHI	hQpGDiZj9baB0M67IqeM0R5GRxLmf2yl	credential	hQpGDiZj9baB0M67IqeM0R5GRxLmf2yl	\N	\N	\N	\N	\N	\N	80bca55757f86b5daff6658411b2ec78:65dc0583a444070635cad30ee3f6c4e597bc0c9acacd13da3a2631f0d850c1cde5e1c2820ca343ef00228c8220f7643c88ce228e021529a352b521f294d4ecbd	2025-01-28 08:21:38.264	2025-01-28 08:21:38.264
PWxvwe3YvcxVeFQhgDqBWfOu62jEE7MR	y83yPrsUhYHjHTRtpT5Qfrlbg1Sr07sp	credential	y83yPrsUhYHjHTRtpT5Qfrlbg1Sr07sp	\N	\N	\N	\N	\N	\N	1686a7ff99b1a21b86996f496ee8123f:11e4d5ef5775cd0fb19c9dfbbfbec7c8f266908dcd28280c843d30ff0404b5ce824c5240ed3d054dddedbfd7319374a9a8e39f264af74da33c144545e41ec613	2025-01-28 08:21:49.396	2025-01-28 08:21:49.396
wrwpQpfZINnHgBVuIeDhkXTCkUUNErUc	hp52XOMicxLuZCcn7Syzo1jbP7JcIKud	credential	hp52XOMicxLuZCcn7Syzo1jbP7JcIKud	\N	\N	\N	\N	\N	\N	5b8a73924b9f577f72da029f21992e53:5a2d6789f31926d6a48221f28399c682c6dda480c32dac966d54a95587295814860becdb3e014eb149d68abaf02ebe9a0611036b07c59b04b4a6a97d916e9a0b	2025-01-28 08:22:01.255	2025-01-28 08:22:01.255
BRaBW9Ed5Hhpra0J7gbkS8HT8qzc3MyW	f0mOJ6XtFqCrLBQn4ZND4lUShBu7t5dA	credential	f0mOJ6XtFqCrLBQn4ZND4lUShBu7t5dA	\N	\N	\N	\N	\N	\N	41bc5bbd8c9d2e6659a9671245ab319a:9fe9f74abafc61a1ea0d1a53621e6fb16e205decba5fdb6c7486ac180d411d209785487e4d49985009a01d130ce690f063ceda5658e6f4a764d576f854c51165	2025-01-28 08:22:12.669	2025-01-28 08:22:12.669
lieQKBd1zq8xLA2Ga7CQjZsLjV2VN2TR	6RJrxxVZ2Nv1K62PdEOwoHqNRWOkWh61	credential	6RJrxxVZ2Nv1K62PdEOwoHqNRWOkWh61	\N	\N	\N	\N	\N	\N	2dab180509f973dea0b07af170b73851:b966f6a5df55984301bb12d6d4dd35224408a7664aa1aef16490dda43f92ef74be10efd3dc86765cf8f44aa37dbcd6caea9852a18289ed608ef25dde8b7d1920	2025-01-28 08:22:25.066	2025-01-28 08:22:25.066
ryCqW9zQlir55ejWOum7TLQnB8vVuJmc	bcjl8qsHc9RjzaWeDPfNL7GsXg8ATci6	credential	bcjl8qsHc9RjzaWeDPfNL7GsXg8ATci6	\N	\N	\N	\N	\N	\N	b91ff47f58e8d9e2d0cab0f860c4b798:310e49a1b906570f043097ff22ea03c7c4419b48a792e8836d93bb8a7d6a3ed38c02ed1b93d8b264081c9285258ddf1bfee3404b42fd983befe8b29b1a51cf6d	2025-01-28 08:22:34.667	2025-01-28 08:22:34.667
QaAfjJAQNxG6PRQgZXc0Uckll1uqxibh	wMgH9N3jufdVmOg7G8nRy8KuVbXZ2FVZ	credential	wMgH9N3jufdVmOg7G8nRy8KuVbXZ2FVZ	\N	\N	\N	\N	\N	\N	c8bbdbad20772070dedb1a3dcf76f799:35d5d525d3a3c14b6cf2a74bf398edf6f42b8a25feac282d2c6754ab2aa7544f07744dcc6c31367a562d011e5d93d24fd913b82bcac05b973e35b088528d689b	2025-01-28 08:22:46.353	2025-01-28 08:22:46.353
mA5CjRboXXcNP8BjufRWaj9SofJEggvx	ZSWGG53QN4Cpk4IRLJ1RwuYvCzCzn7eV	credential	ZSWGG53QN4Cpk4IRLJ1RwuYvCzCzn7eV	\N	\N	\N	\N	\N	\N	8af586f1a1ed6371374234a1fa65ecba:6fed3bfe63ac59db9329bd52c44a9f782b5a6fd291eaa0698f29594bfe65ecafb2b89f960806da773fd5c5426488abc9d53399d83be34972e6086e40f6eeb4bd	2025-01-28 08:23:00.068	2025-01-28 08:23:00.068
scei5gUpaLimYCHtKPnK7lFbXTXnCowe	8BXD1HC8CF66qVIkZCxuDnC8iOKC4FQc	credential	8BXD1HC8CF66qVIkZCxuDnC8iOKC4FQc	\N	\N	\N	\N	\N	\N	20b4468626ebee8f3c05d49d951827b6:0f3218ffd35a621361c2119e1b89552c199db741beead6438a911b409c360978262efdbad3cfdfaa0c45d170b362a0d345ca393978076e67e8be8c418d0e22dd	2025-01-28 08:23:11.421	2025-01-28 08:23:11.421
47CnqbzumoymeIGkDjjctW24596ALfeX	6GaFgKndlIwCdN8w4kawcPGTcJYznW1w	credential	6GaFgKndlIwCdN8w4kawcPGTcJYznW1w	\N	\N	\N	\N	\N	\N	e0f8777c4b5c900b71865b7fa05b30ef:480d4fbe4572306b1aa85e2d3ace61721b59cec938d27c1d833bdae77ae60b081c93d81f1bbaad3fbbe1db562bd0ca29269fff1f1c4ff9e993254625cd21f05e	2025-01-28 08:23:25.094	2025-01-28 08:23:25.094
mZoV48JNDZMnDhMdi08A2itwID9Jc7OO	0f7EjCfsEPdFgpYsmgema2nSq2dk2FEs	credential	0f7EjCfsEPdFgpYsmgema2nSq2dk2FEs	\N	\N	\N	\N	\N	\N	984c0699237c5f0fda6bda461ea75d31:537965b6d81d28f7422625a2f842dcb847da9c02d6b49ac2b727f5b53332fc7b13729860ff95ea32c72a94c3fadd6e6b95e3f6c9265d0f70fc4c360ab81bd110	2025-01-28 08:23:36.715	2025-01-28 08:23:36.715
6PCx8i47TIQkvWcj2jUvVMQQxt5gZPe7	0smdeCPG8fN25YkCLSEE3Cc5SLDzbSsa	credential	0smdeCPG8fN25YkCLSEE3Cc5SLDzbSsa	\N	\N	\N	\N	\N	\N	06b7fb5e4aa92c089cb34c3ddb01a67c:6e8e3ef1084aec64c660666cecd793ee1b56c47328e2ea5c1eb9a12472ec73062f7b634e7047292062f7537d98d23c1b891c7f51cf8cf1b7a9ca8b2e1265e49e	2025-01-28 08:23:51.194	2025-01-28 08:23:51.194
M7nlppvVORvnC3WVglZjU4WyIh3er8nO	JQGHfwjFZN8Nf3PZws5TCq4JVhQHIner	credential	JQGHfwjFZN8Nf3PZws5TCq4JVhQHIner	\N	\N	\N	\N	\N	\N	f90745f109ba661630b9783c1c7d6214:eafa3f171e632025f72f3f9773aa3254cc7e36f4b892c5a25e3e0ece90c8ac58be15d7cd22ae7a206d517b2ec6afd0e2fb3f62e9f2519c12adb63175e2629a35	2025-01-28 08:21:11.378	2025-01-28 08:21:11.378
rRmchJY9AgZLKCknqzwhJMDfz2PtiO0S	BIVaPos98Z98kdYUkBzuSLwVi4qIS8kh	credential	BIVaPos98Z98kdYUkBzuSLwVi4qIS8kh	\N	\N	\N	\N	\N	\N	b17e936fe25832f34b1f5f70b5b51a76:f988d7cc35886d920c733f0412d38de2b8a83d34eb4856bc260e3f0a56bb85bea96fff55e986f49815bf340eaa138267d21e1c4791963a331bb2791dd1096948	2025-01-28 08:21:23.033	2025-01-28 08:21:23.033
N89BxTFpbxYcvSOi7UgU2e3aRxvXpf7B	087nQlbR28jfXO0fNVnaPEKjN31xdlCc	credential	087nQlbR28jfXO0fNVnaPEKjN31xdlCc	\N	\N	\N	\N	\N	\N	9d0c4702f23f3d8f2dba0d19d71bf29d:a5200b917b8eb7901f29a97a021c7e96cdd6964ef3238bdcc4b07f6b066e09cb24395564fb67be5d8480a2a35cbedf5eb226ffe4d045ad0f9ff1c75e6366b0e0	2025-01-28 08:21:31.373	2025-01-28 08:21:31.373
f2aldfpCm9ct6AriOI4uu1KYBZwrdU65	OcJsu6FEhwZAu5BmmzGCUwfafrbjxLsb	credential	OcJsu6FEhwZAu5BmmzGCUwfafrbjxLsb	\N	\N	\N	\N	\N	\N	0851ec056e2a07bc63d84267107d3938:0972794af79fdbc351eea362ac1fceed1f4ccc24a5d513ef328507ed32f4f5a5d7adc6ac3b8d345ddb96adc50ce6e0ea1b7caf93174510a60856452174807995	2025-01-28 08:21:40.34	2025-01-28 08:21:40.34
sQNgr8dI8zBfvfXLhF8SfkVghNPTjyUe	Ou5utFsUn3tuJtsYpeqGnReBcEWfbtVx	credential	Ou5utFsUn3tuJtsYpeqGnReBcEWfbtVx	\N	\N	\N	\N	\N	\N	e4c432b231886775984c8e17b329da0e:dd7a760c4d89432286fb6b01e26becfcdd5d23fa149fa6aab891320686387f870615278fc2153a7a54715be2b6919be8965874404500f69d2353815f4a4dff31	2025-01-28 08:21:51.365	2025-01-28 08:21:51.365
lIiBt2Vmh8KrxffCXlaLGmrkggmSwmBd	Lk2P4Vc16kegKlDRqlORrpPa2LONw7pe	credential	Lk2P4Vc16kegKlDRqlORrpPa2LONw7pe	\N	\N	\N	\N	\N	\N	e48e4f4b3b049d9009800c90ef9d3d9d:947a2c28e8eaa0e9fd81818df69c102517e2ace4e989ea97e2b70c6104bf3e0157fd1409314c275bbd3040a41252ad6e7c3e67ed17098145f0c423a743b6b9a5	2025-01-28 08:22:05.081	2025-01-28 08:22:05.081
9xsOMTBxYLHQtGFZZY8NxnkCtRdRNNYz	PCvpdwbqfDiD5v92asIOC0swhNisfk63	credential	PCvpdwbqfDiD5v92asIOC0swhNisfk63	\N	\N	\N	\N	\N	\N	07355087420c6713324eeafeedd594e7:4e891e47c5cc1d610251cfe2702bc507f4503e2faf4d615954c53fe451ed44bedfce80f956c09ce35af2d4941489039f9abaf24ddf10183c5859df9e02b5fa50	2025-01-28 08:22:17.692	2025-01-28 08:22:17.692
H0kCtvc5150GFMMXAqkXOHjn3eLgzJ0k	qPkHcjrcCGPCTL45b5WkD1gsajMgPzgO	credential	qPkHcjrcCGPCTL45b5WkD1gsajMgPzgO	\N	\N	\N	\N	\N	\N	195d93363d8b75c15cba6e182c734bd1:377b511c99d3b11d6dc5ae9ad989e24a5c86279b08332ec4d8ce89e5c60a5d468bc6afe6f1a8e0f6afe52d83ef70d4f13a8b2cc24edd58c94528f46a9d15da22	2025-01-28 08:22:22.196	2025-01-28 08:22:22.196
yJIAMuzXqZJhblOvAjxUaRH3tlnax1wZ	7Nai32SEtgUN5XtjbCW5BsXrQDN4Nw6X	credential	7Nai32SEtgUN5XtjbCW5BsXrQDN4Nw6X	\N	\N	\N	\N	\N	\N	b924138dab2eda89b9d746aef1a83cec:f12622183f0af7c635951661a914a02ba62157fbcf5a8c18b4cac2c965f708a0bf25fdd9cee5371cb4fd8c61e7c772d1d914362d7a11312d3fbcad2bc719f0db	2025-01-28 08:22:33.451	2025-01-28 08:22:33.451
EE6iRKUQgfL4bPvNhcb2Gc1QSnPqkFLx	qpUX34oCzjdWSFrlAnap94sZX9m6vapA	credential	qpUX34oCzjdWSFrlAnap94sZX9m6vapA	\N	\N	\N	\N	\N	\N	cf53dd81c3950dfc851e247a11b8f111:8e4584540b3eebe0ca516769413e4c405b2e07c142a04a64dd954bd263477ad7fe2a098241c162e0665fdcf344558181be2bdae6a2526ef0c5fe46bdd7a09da2	2025-01-28 08:22:42.339	2025-01-28 08:22:42.339
KckcYkh0kWVei4T9u7SmzfwfzLfPphPT	svKvrVnGzixHcZKhMXGwM9wpM9C0TJu6	credential	svKvrVnGzixHcZKhMXGwM9wpM9C0TJu6	\N	\N	\N	\N	\N	\N	5cc4fca6a445c29e240ad1d80f7b8f1c:9362be3a22dedcc9a23275bfc2b3929d2626a5325da9d1ac5855bcc144609c3827dfd8e01d084ec854ee7b2a000b25fbb8bedb915e88bdc6acce92ba120b3c11	2025-01-28 08:22:51.765	2025-01-28 08:22:51.765
gjAsSd9o70WpBFlfors1tkbgALwq1fjx	9Ff1P8bz8HLjYqKd84cde9ZflyOVcH6Z	credential	9Ff1P8bz8HLjYqKd84cde9ZflyOVcH6Z	\N	\N	\N	\N	\N	\N	7fa578173f54395a66cc910d90d72b27:bc8179d42d77a3d2ff3247a54d312b98c4aea4c9ead7838cba7c69346beed7c3543e062e1df1436cd88460d0234593fd3341bdb2e1d1542a02b10629848c2515	2025-01-28 08:22:57.976	2025-01-28 08:22:57.976
JUdAWCUQdpdAh4t7iBsmMd1ACVxQvAWh	uxF2zUOzZ9OiMCijKA2RH9UyL9iSSnAQ	credential	uxF2zUOzZ9OiMCijKA2RH9UyL9iSSnAQ	\N	\N	\N	\N	\N	\N	6052d10e2134e7259e35126db3834538:62706ee045fdd09b1cffba24e0de917372197805e054600b0dec1dcaa12a497838d742749f072faf654bfed1e601abfc348c7a828a7a681a55052833565d6c6b	2025-01-28 08:23:03.947	2025-01-28 08:23:03.947
hHqS4sAF6HpdcysYjDjIvg7BA7IS2fJy	XfGOM9NHYztK8o14jLvdM7gPFO4ECucn	credential	XfGOM9NHYztK8o14jLvdM7gPFO4ECucn	\N	\N	\N	\N	\N	\N	8bb277f18f9cb3383a6b4b07330c98bf:12dfa019cddb554d68f887a1c329029b956fc22340c8f8cd44a39b9817d3af5ea1ee90ac527beaa9d2ddfb77c1d07e243f622aaa9e02dc5759d936e12821348e	2025-01-28 08:23:14.389	2025-01-28 08:23:14.389
NGxkM7xsXILiKIVfttDq7XsxoyLgmQKa	aPZfuCiyQgT06CnYbEvLQFv1uUDwLMaY	credential	aPZfuCiyQgT06CnYbEvLQFv1uUDwLMaY	\N	\N	\N	\N	\N	\N	284028a14279840210dbda6a163814dd:0369dddf5c30a73cd3043807ad6feb9808bd722c31731623dcdc2cd6d1ef699e23b9c8c9ad074d2312fcdc19be6365393c9077cd2a14495eeab48a4f4bf98a2b	2025-01-28 08:23:27.998	2025-01-28 08:23:27.998
wPFNo3CMoLKIjyTpFo3d0PS0ePVm40T6	UNY80zBf1uMNnd4ETcagzqdxblInJmxY	credential	UNY80zBf1uMNnd4ETcagzqdxblInJmxY	\N	\N	\N	\N	\N	\N	ed7e85f8600da4f4363e0015353a5030:9d831d4c8f0b8bc4808909f6f76135ba24e31fcbd53a16cfeceeac4f0157493ffadc96fffe9d71e6c686d2ef55ae24bc0ec39c4ce3f92f68256ee26bc8e41615	2025-01-28 08:23:32.828	2025-01-28 08:23:32.828
unjGHW1q3WI3bHGaau8zJ7KTDLFVofw4	DmlefAwHV89Rh1SVeBJsQDsgbIWf2Qxy	credential	DmlefAwHV89Rh1SVeBJsQDsgbIWf2Qxy	\N	\N	\N	\N	\N	\N	50c9c56e0064f1ce8948b703b529044e:ca0540572494dd01d6d686d83b38e075d00ad677c88ed6414a893ee79eb3c11f9b628d7f4072a70ca370d76702c6adbfa8116ac1b8180d07b43f0268d610dbe3	2025-01-28 08:23:40.842	2025-01-28 08:23:40.842
VarySiYhqpb4LLIzKumMrBB1YCFNsAw2	cULBl5qIqFeZGuOletNraYid6mjgXncm	credential	cULBl5qIqFeZGuOletNraYid6mjgXncm	\N	\N	\N	\N	\N	\N	8eccc17006d57c1073fe816bf658fc81:35bd9a1e9eecb068f0221b22b54fc86383b091c3e038ed91c9487207fe72502c36c5a3d7f1e9d6a26a303d19ddc3cb1e9d0822f4279f23cd6065fdf43a600743	2025-01-28 08:23:48.839	2025-01-28 08:23:48.839
hYKNULfUwtgCVDrjMeOc08VCCENf3I4l	CRhXIMQMZl7ZYbHCX0aMpVrOF46bCCJa	credential	CRhXIMQMZl7ZYbHCX0aMpVrOF46bCCJa	\N	\N	\N	\N	\N	\N	d8ee389d2ca4a440656723e6a1a35e0d:f5ac0f851f7d8fa7430f933aecbc56d715ecebb8542eec2d4c2f25accdf747aaf3c19d8556c275129b789817c4e0deab1dc8078f994eeda9e629f9bebee90c64	2025-01-28 08:21:12.43	2025-01-28 08:21:12.43
9432i3EVbp9jl6blcsGvWMpjtHKGrkcy	zCwu4CPP3dKWMQeys7bOVCa4d5hHXxbg	credential	zCwu4CPP3dKWMQeys7bOVCa4d5hHXxbg	\N	\N	\N	\N	\N	\N	e837d558638cd87373ecf11aa90421f6:8107bb15636801c1015fa08e52c5bf03f7954614e21f41efe62487266186107aae60f608d2b5834f285afe83789115bcd0f79517053b518bfea8266f51c9d29b	2025-01-28 08:21:24	2025-01-28 08:21:24
ThYZyS8DTUZTUBDZgzLQA9kC7LhuDwDf	bVfgqrsZic98sjQDSbLOmwRxcRnUhnqc	credential	bVfgqrsZic98sjQDSbLOmwRxcRnUhnqc	\N	\N	\N	\N	\N	\N	5e5ebd2ef94c4a4b008ac771d67233ef:ad67acf83b4e7f93086d67ed7f50d440a2417e0d09523dbf1dd06715e0a4473d462585ec331dd76bc80ea19dd03a4db2b3a9e4158f0c150730997da09c09a446	2025-01-28 08:21:32.46	2025-01-28 08:21:32.46
S7zRp9SjD0zjbLhy5gOBz50mWdybdxCK	WifEm814GIjer5GKL4kYD5NBlVfkHxT7	credential	WifEm814GIjer5GKL4kYD5NBlVfkHxT7	\N	\N	\N	\N	\N	\N	28cf3c53dedefa575264bc2adfe881fa:058915394ea10d86d8881a8158011ee7c50f548bbcae19313ceb0f883de535b446c65616ce4804b6e23c9071f8a0c7642244954301555be07fc6faa38ee5e362	2025-01-28 08:21:44.78	2025-01-28 08:21:44.78
qqw1vMWJOO8CMSRGjRPhISqu1c0ZeEEV	vV3eg3x3UZ2HAfNY06SdQoZsBAG0CPRV	credential	vV3eg3x3UZ2HAfNY06SdQoZsBAG0CPRV	\N	\N	\N	\N	\N	\N	67a1547974e6b233e126e323b4df7c59:6e050dcfa2c39849460522a18bc14f8a31b4e2bd82c579e5b018b306f3723d9c174e3b5a8d3c8d13770204e03c15291ef55e11fcaae243db2c23b0348c9368d1	2025-01-28 08:21:58.992	2025-01-28 08:21:58.992
iZ5IhbfPjqLSGE53Z5SH3Wxh8wBarYKk	cV1FaCDfY1PREjteB19Xw4VpfrBfZe0h	credential	cV1FaCDfY1PREjteB19Xw4VpfrBfZe0h	\N	\N	\N	\N	\N	\N	4be12d7562bf2c8b1f1eb3f7435c78f9:eafef1404cd86fc7928fd51a66ffa1f4956fa87a5b6ec7bc5a960e5d970913df283fe1627fa38272bc5dfeb3a2c8fd99703ba3ffd1a78dcfa50abc865b06fe5f	2025-01-28 08:22:13.812	2025-01-28 08:22:13.812
oXh0sssyWnvveKy2W31Fbt6boraSQKiP	z3VSg0JhiQPQKymcfjvN1vmfrIQkDPsc	credential	z3VSg0JhiQPQKymcfjvN1vmfrIQkDPsc	\N	\N	\N	\N	\N	\N	bf41f70fcbb18e3b74c2192215d73225:6c7a21b73dfb130fcc68ae352387d4d0892e0be5cb3a37bee97587f61f858bdcefef8e6f318c83ad449700cfbb973c77e41901aacb15f54dbf4e99a586be8f0f	2025-01-28 08:22:26.034	2025-01-28 08:22:26.034
MmR26idfruwvPLUroIig9fpztvXVC5fo	XvjXHnydaWOsVdTYH7WMeNQ2uGeyq0oH	credential	XvjXHnydaWOsVdTYH7WMeNQ2uGeyq0oH	\N	\N	\N	\N	\N	\N	5826758413eab22077685982b18e5c79:eb95720c1627ba6a619cfd3ed513772836e12d5893bd14841aeb2d8a6caaf36e1dc9c7de2bd065683c190bc4f906f0bb34d24b9c1d3f6c762ba6d4c5974965a6	2025-01-28 08:22:36.947	2025-01-28 08:22:36.947
AVvsw7Kgtm6rez76oAibRGcD4hGWWjB3	C81ooibC5STVSn62VzFbDlBeMgn5kH78	credential	C81ooibC5STVSn62VzFbDlBeMgn5kH78	\N	\N	\N	\N	\N	\N	de752194e28884dfaeb445d63ec4f2e4:deea9334e4d63955d3d5f7cb7f854f3094992ff77b72946e95a2fdbbb854e6c5c550fed10465b3aeccedf7f378f921bd9c2810eb832b561f563b1721e13e0867	2025-01-28 08:22:49.537	2025-01-28 08:22:49.537
JMxrJbQVWdDc0Ba3Fy2jKA5h38WcXrAo	DCW1F5DJd8IywmYmXEhpWwuD1sWmsSV8	credential	DCW1F5DJd8IywmYmXEhpWwuD1sWmsSV8	\N	\N	\N	\N	\N	\N	3bac9151bde40d87129b8c97a2e45c66:0ae4aea145952726495a09b6a568c1a5741b9e9368271b68b34056501d0be280378a0d3cee7ae134c9c71d5da79e661babb6f8e338f9ea2122f892890144ee26	2025-01-28 08:23:01.02	2025-01-28 08:23:01.02
cdeA8LI6hVnEpm9r4aAyPWz1BKzluNg3	idKbjNUHcuQozZ72edKTpfpPYpmmc62I	credential	idKbjNUHcuQozZ72edKTpfpPYpmmc62I	\N	\N	\N	\N	\N	\N	b76b79fcf280afbd3c166bb565b0b607:75e1f3379eb21ec8c79f7a5d295053a4c88ab0730139a2a9afc274275545e51a0ea0d86a686817e3cc3ebbc7d31eb2c542d1ebad0aca3eb98733d49178ae3070	2025-01-28 08:23:13.399	2025-01-28 08:23:13.399
pRWCY1Nf5pfSvSNncMHVN1JB2ekPmbau	NKbJhAs9mRCWgS4jnX7qVxaUuIHQg1De	credential	NKbJhAs9mRCWgS4jnX7qVxaUuIHQg1De	\N	\N	\N	\N	\N	\N	2075502b18675cafcbc159c8fb68d7ae:fa6523931419233378649398f6a5c4c91bf928afaa3563c038624654e51626503a8846425d014e5fb68db2bf66580e921f0aa4c46142937a8b68f432b59be33b	2025-01-28 08:23:24.13	2025-01-28 08:23:24.13
MRaSr6pBxnixeAqWQdBzlbAOgV8x8LQB	Kci2lQHqdhaFnhAT1DOx59R1uap3BTqK	credential	Kci2lQHqdhaFnhAT1DOx59R1uap3BTqK	\N	\N	\N	\N	\N	\N	99b8d1c6f3e997f2b1abbcfc6caea237:523957e5085ea7012e55bffa7a2b0f51b34b4313dc8538e522cc4ac1ead98f261c4b18cd84f90ff3e60992f36e45b3931458d63b4b41c5f928fca2e1c74db905	2025-01-28 08:23:37.668	2025-01-28 08:23:37.668
tKIHCnVhnYDCCQfqDgUUCebMsF6GtGtU	mBLWI8WmD2qcpAxtTrFh7fDGTR6gtRaq	credential	mBLWI8WmD2qcpAxtTrFh7fDGTR6gtRaq	\N	\N	\N	\N	\N	\N	654544ac217825799949f8531f1995e6:876c46852b72599bb23daa130306d51ed61a4195d4f77ad5be295b4dbdab7d9bdffc1cf71f756327b35d6811304e3f8fbdab581b39482d9400973a28be920e71	2025-01-28 08:23:52.293	2025-01-28 08:23:52.293
VWwtj2KcADezchKvSIl0t6ntZNSzC5FD	fCmXblAhcAnr4FdBUn6wslr45MR6YVdj	credential	fCmXblAhcAnr4FdBUn6wslr45MR6YVdj	\N	\N	\N	\N	\N	\N	695619ee8a51de13c2bf64372f57294f:c8e1652dc6658c5526783d99514eaf69e2de68b80d1cadc5ff70ca8260fdd098f36623a8d9e49680aac29ff2502023a51f8c6511ae931855993dcaa57b67348c	2025-01-28 08:21:13.381	2025-01-28 08:21:13.381
AJ0eY1KFNVF8HqmX9bZfngjOw4ICLFu7	abd4v6wBfYniQLo2FdnQpG09SVhiqm3f	credential	abd4v6wBfYniQLo2FdnQpG09SVhiqm3f	\N	\N	\N	\N	\N	\N	98801529c6a9d63e7c79810867753ead:19ec3f95032640b0241a85a5b8726121ed7e6041077905a52026b4f122ce2ccd9c2550c25ebaee38da2f185177a834a604d3bddc3d42b6e6a98b4c1e03be8e8d	2025-01-28 08:21:24.96	2025-01-28 08:21:24.96
gHIxmvZvR8ITO37oaSA9Ah1xFuO3ejLI	tLAbkwObt25vrdyvRzt4RdXfy03EqU2y	credential	tLAbkwObt25vrdyvRzt4RdXfy03EqU2y	\N	\N	\N	\N	\N	\N	1d6723be37927ecba205ade96cf341f6:8b79a84bab1a9095fb2e57440bc4d97a7a071390144de9d5b8591a8ccba81b7d2e8adce68c4006a4df3dc1c1a068e7394cbc40275d459e5f20e00b638d14d83e	2025-01-28 08:21:35.957	2025-01-28 08:21:35.958
Xg23jSvWmnhazSSgRGcRDTQuvwEHtYxX	9PphWHeQYahz3kwPwkfxXoR0WgjkUJwK	credential	9PphWHeQYahz3kwPwkfxXoR0WgjkUJwK	\N	\N	\N	\N	\N	\N	412ca8992aa6db52f30cf24bc5be03e7:961074609ebe9a7984c097da25b886a49ecca011806ed6196fc79c3ec37a1006b5247d89443a1c21e2a8c9046684ac8916ebcbfdfc4d6b492d385f6882629942	2025-01-28 08:21:48.131	2025-01-28 08:21:48.131
MNSHUX4TjPhxcS9GcxKVAhpnvp4uBh8Q	vLE2BT8bbOgrFnviovQLKo5KgGcFBdI3	credential	vLE2BT8bbOgrFnviovQLKo5KgGcFBdI3	\N	\N	\N	\N	\N	\N	4d53c255845e6ab06756b880c742493a:21cc87171a6143ec9b97db62efa340424c54bb79a353861166ca033a904637462f589105670bd32e061d6800108952768545ef93f56ffb2ac3dffd83cf40783a	2025-01-28 08:22:00.043	2025-01-28 08:22:00.044
7fGtV1EIveJ9sBZv6JMNUeYzuQuvj0AW	GdQuiC00jiTON9hEd9yNZsdUvlobvDRH	credential	GdQuiC00jiTON9hEd9yNZsdUvlobvDRH	\N	\N	\N	\N	\N	\N	07738dadd9f5a683b1d0cd2bde43f4dc:e71dac75c3b5711e18caf82a0df9f4d181e365f47ee9af0d67c6f5eab2cfc164bcf5e68ba5b1e585ac0df04ba78321b805bbfff5308e2f9ce456bd2abbe2dd8f	2025-01-28 08:22:11.707	2025-01-28 08:22:11.707
9MwVHXbSaecRqdrdaJFAhGbhA07jCfL0	okQQ5URqyaoTdtU8Bqx4cJEjeVYwNlpB	credential	okQQ5URqyaoTdtU8Bqx4cJEjeVYwNlpB	\N	\N	\N	\N	\N	\N	0bed4e24092a6aa870b1b25c338a5db6:5c6e5e1c5301d8406e12580fba358fffab9841b4724d20d61f24b26592cf2256fb473f586706a7eaf0cc546c65db5528c6c36180feffe224caa38a42b695e9cc	2025-01-28 08:22:24.111	2025-01-28 08:22:24.111
ISVzJvy0qe2UIpKlTUjm4IBN5YKg2r4a	R9Hu6q8b1WfKLxJrVZSSmyvkE70O6OJZ	credential	R9Hu6q8b1WfKLxJrVZSSmyvkE70O6OJZ	\N	\N	\N	\N	\N	\N	830c46db07fed3b1228ddfe79c6e9315:21af66fad86393e7f3be4c77e7b8791f77ecfcd6d927962aba7f54d47acd894f5909072b6086d3a8ab55aae9bdd094d4ab8ffc2d76640a2107296c83b4c33403	2025-01-28 08:22:35.717	2025-01-28 08:22:35.717
n5wAz08pAWiEfevhTXDXOQCgwrgSOmog	eleJHsaoJli4DIsVY6ztb2B3cqZY4erH	credential	eleJHsaoJli4DIsVY6ztb2B3cqZY4erH	\N	\N	\N	\N	\N	\N	457d3805ce766674aa73fb832dfca3df:2f86c32dfd08255c28f1a81b037c026b4f8e4c9f1ed14d49b6ad5d5692073ef6dffde12eeb182c9460b628de0186c2e9d9a5ee68ab3103df1a7730be9d422685	2025-01-28 08:22:47.323	2025-01-28 08:22:47.323
JJm9sCjYWUekV1iIRbgezg5br1ERVzs8	gattRtud8aA7XZ8oJW6g7jg13cFYwmgK	credential	gattRtud8aA7XZ8oJW6g7jg13cFYwmgK	\N	\N	\N	\N	\N	\N	a279c33899cf752560aee33bc2225b05:0d57821683cfd3d8dc2055f277b610b61cdc48e74562c67718cedd25908545ea58ae7dc9aa7af326174c1df7c5da49f96f10f4f0124faeffee52da91071035ad	2025-01-28 08:22:59.017	2025-01-28 08:22:59.017
ak71K7ubup8O7Hk7NkDZZ09kZzLkqRJv	tfTDYHXK7QAbJHDYvt5yIK9ys4cqiCG3	credential	tfTDYHXK7QAbJHDYvt5yIK9ys4cqiCG3	\N	\N	\N	\N	\N	\N	e1eacabcea30529db0e6614a3b465a34:a963574169216aec3f0c586487769cd89403c3e9eac49c49cde6357e4625545174a0803287e5dac4f4c5539d344b9dcb3e95446d41213f64601503ae7539de6b	2025-01-28 08:23:04.951	2025-01-28 08:23:04.951
oOi5hBv1ahkNfIWcHvhwLcf3Bx6Gcqvq	cW3uygZSmbEfFYzuyFADnmhdzbCdTrJa	credential	cW3uygZSmbEfFYzuyFADnmhdzbCdTrJa	\N	\N	\N	\N	\N	\N	d783484c9d8c5e05a471ad788a61cdd1:eb68c4ab2d5372b7bf5c37d785b470c9c6bb4f0297d40493847a02252e4653ffcaf76192dbe321a97bae29e4f0427ced064befaf7c5f583651797874086011a3	2025-01-28 08:23:15.788	2025-01-28 08:23:15.788
9OV9jr0uU1512C1CAB1MKB0beAK1FBKn	U63HaDNhT2SgNb8bzqu9oX0FDmCephtJ	credential	U63HaDNhT2SgNb8bzqu9oX0FDmCephtJ	\N	\N	\N	\N	\N	\N	1ff324736c78002085dd4c8ed0afc5da:278f54c83a1abcd8965aedcacf7f5b51d861c9faaa97ab3fe3d6811277b76226a0459dcb27eae1b6ed17ab720e86da96cc69f0306b8feede362310441127fc20	2025-01-28 08:23:28.959	2025-01-28 08:23:28.959
Bz8hOWdGUCcMEuGgbX3ctSYKPHJKCd5U	aV8V8XWAnnFfyzRZhdBTMKSYy1ohAIz7	credential	aV8V8XWAnnFfyzRZhdBTMKSYy1ohAIz7	\N	\N	\N	\N	\N	\N	940655879b2ae456f6a0867c638e82f3:499f5f5a85f9174424a725399ea55b1c3251d95244c46b4efbfb328e7016929bfdf0575421e9dfdf4981337ea85400b3c06bf9370121640f62589b9ff5610efa	2025-01-28 08:23:44.1	2025-01-28 08:23:44.1
X3GyEzvw55M8fMw5nkhnU1S4l9G8lhFG	MwoRXohC6PgmKyKIw2gDZKXY7O6LHU88	credential	MwoRXohC6PgmKyKIw2gDZKXY7O6LHU88	\N	\N	\N	\N	\N	\N	539a2ffb7121045561069cbe0bd5f638:c4eb6c8458bbf0bd1d38d5e91d6b1bb524898a1f9a1f0f6f7ca8f47c27a5a73a0ecc6810295e22569eab4048a35c6b40596920ef36e0785c9971bb97d30e94e3	2025-01-28 08:21:14.343	2025-01-28 08:21:14.343
IpAUznWf1dUxCQ7zHHu2bjRyD8uSPBNH	YSTg5AEvBGrQyAWLditxSK1O9bHVC0Nq	credential	YSTg5AEvBGrQyAWLditxSK1O9bHVC0Nq	\N	\N	\N	\N	\N	\N	4b661409077e57d7dc16a3760bc66958:1d616499bcc3775755e3d61858ee24875390bf3bdf62b2e12479900d81e1ea010046fbc1fb01a0ef13ab265be3e4f005edc817aad9fbf7fdb49fd98a98f4658e	2025-01-28 08:21:27.075	2025-01-28 08:21:27.075
mrjvz5Xc1raVd29TbMxRbGk0wyR3qisc	cVfHrbgAdaMz9GHD4h2SZpIMa09ix9cG	credential	cVfHrbgAdaMz9GHD4h2SZpIMa09ix9cG	\N	\N	\N	\N	\N	\N	3d4cf7f5e066f362915c5eadb7e536f8:fbb768d5226ed139d44740d1e28aacf5e8b13f076ece9e23b7a0208a04afc0da75ff27e648521b56d2247e98a6e5f68cc4e9b8b8aa77a27edc36ad0dbcc44555	2025-01-28 08:21:37.166	2025-01-28 08:21:37.166
e73B0k3Ixb5tfEFNbV2xnPQpVIddDPpW	q1r6DLlcjoEte14NgrtUImRBZrbfBaEB	credential	q1r6DLlcjoEte14NgrtUImRBZrbfBaEB	\N	\N	\N	\N	\N	\N	9e01dd2667647255021ba45aea6beb36:f494ef76df62702e1dbf59265aa80f22c3b8799e65d75e0cfb181e22fd7177f399ba497b3bb160716e9d5417d20ce5bdb0d82a45b2574f53b86a0b6236347167	2025-01-28 08:21:47.062	2025-01-28 08:21:47.062
Z3CajelxUvxOfnHhklwa9lIsQ6CVL6RK	xjzxrgKXKYVKY1oO1M4bkhGhijjVUpkt	credential	xjzxrgKXKYVKY1oO1M4bkhGhijjVUpkt	\N	\N	\N	\N	\N	\N	b5ecea3d004ef73e8f0b36dda3f5c33c:3552aa765e4c274ad640458c20f1291b5d11e5cf1a08a0d0080c9c0bdd0c85379e54a93fd4a50ac013cc0dd3a886a6c38ac57579554786257a2dfeb379bfce12	2025-01-28 08:21:57.619	2025-01-28 08:21:57.619
FTxhowa138FZncke4Bg00TPfg2UJSUew	73AM9XAgdblvcx3euEN7yMhFOhIJNRQB	credential	73AM9XAgdblvcx3euEN7yMhFOhIJNRQB	\N	\N	\N	\N	\N	\N	6764e5fac99e623d2bd20c96dd2fdc4d:2f15155ca940535fb8b57a5d6030e869386eda6a390abe7ae69874d5d6f36c08c34aceefd4ee561f38cae655f2d0693a07774265bba2e2433a942b148eeafadb	2025-01-28 08:22:10.764	2025-01-28 08:22:10.764
0VAGdHjgUdZyWqpRTH3ABTrn9ngG2cbS	RkCgU1glcxMBPZNQHa6YnTEPETLe5Taq	credential	RkCgU1glcxMBPZNQHa6YnTEPETLe5Taq	\N	\N	\N	\N	\N	\N	ef9681b53ee90808e5e83834083851eb:f2af4bab1cb56de8b349e338ca7c147d4ec6494c801284842a2641fd3e4973fb950adf81793000e0f00ec2f61686bcdb4947f866d83bd73bb9483cf74cdf785a	2025-01-28 08:22:23.147	2025-01-28 08:22:23.147
eepPQODKeHaKt62KDwmSpM4lN2Dc5Cod	b22tQKj0haB7hg2EpJibgS7wg6PBkuYm	credential	b22tQKj0haB7hg2EpJibgS7wg6PBkuYm	\N	\N	\N	\N	\N	\N	36df2fc145fe53c295aab79323413cd1:ea50105fd7ee1f4d297980677855b40db94d6fad1bbfb6b9ff41dfbfd5327a00e0211969f3189ca7376ceb203fedd4dcfa9188cbd0a67fc8ae2ea255921325d6	2025-01-28 08:22:32.235	2025-01-28 08:22:32.235
ct33NkS8eidhjpfgdNVO99JpjYhg8jn7	siYrg43ghmez42BKYeixakiVjTxM6zc2	credential	siYrg43ghmez42BKYeixakiVjTxM6zc2	\N	\N	\N	\N	\N	\N	466effc8f17cc1c1184b1161e0189708:1e32cdd2b83235971ce138fd3ceb70405d24230080ef94147d397877e3961b2b446c3a7527bbefb31f2346a6607ea7d64192fa585cb499dfaacf825d89bba435	2025-01-28 08:22:44.44	2025-01-28 08:22:44.44
UEHPuFjgXlDCQoz4EZfQ1rhmy7gn9SXB	ekHXYtwXC1evA2FnLXQfbuxGfP4wR5Sm	credential	ekHXYtwXC1evA2FnLXQfbuxGfP4wR5Sm	\N	\N	\N	\N	\N	\N	0d603899b71ea9d909feecba515c2721:330580370ff3e29aeb9c0a3dbd57e7fc24b6201cfd85dac43320a67124efe702d329572d462d567056414f54935dcc43f6308694eb0ed8f59cd2d30cc5758d62	2025-01-28 08:22:55.861	2025-01-28 08:22:55.861
m3PCl4d4oOXenausRpRal2Q1CC3FmukB	YzTLtIPgH8qtAbLsqyHxQtcgmWbWiqDB	credential	YzTLtIPgH8qtAbLsqyHxQtcgmWbWiqDB	\N	\N	\N	\N	\N	\N	88c526ae7c17d5f6e762465312e44b31:7c100b5c615b2b6927dfdd7840570b7964d09c4e03f61c5062633ee80333889abf7786a655684dd60cf2528f8ac2c29bc9849f66c7cc6743fbeffe7e8844a06c	2025-01-28 08:23:09.358	2025-01-28 08:23:09.358
JL4ZEZuqj2nrmZMK3QGhf3lPcCTGD8tK	IkKBIfG3ix2NtLbNQlcJ7aalDgSPaGNn	credential	IkKBIfG3ix2NtLbNQlcJ7aalDgSPaGNn	\N	\N	\N	\N	\N	\N	14b04c6a048f69e6be029a074126c48a:cf6c93f42cdb56ad8ef84ba7d55a4d6ed4276bd15823318259316275df397bb55aa5d99cde274cc28756481c8dbffe7bb45a6c145fa709cc0a220b911b758ef4	2025-01-28 08:23:19.767	2025-01-28 08:23:19.767
QdD4Epdo1iAdBcriHy3PZaxQ7gp8BiDu	tmL1aVXjFAXseELscfdPoOdCBN2qsttJ	credential	tmL1aVXjFAXseELscfdPoOdCBN2qsttJ	\N	\N	\N	\N	\N	\N	f46987ab42a1d4172a1406521790ead9:487a8e43c064d957214752830ff2a68cfe608622cfe8ad660b92b60fa65a5e2e46da409eab9d38010d2c85fefe8db8bafb0be73de5e9cb649d25fb56d409f232	2025-01-28 08:23:27.028	2025-01-28 08:23:27.028
TppXFPUNT0KtE0s6MSNfC5aGmJ2yjEMi	lpTuvRiZIzrWTVbf4qEOnTK6fh08J8Id	credential	lpTuvRiZIzrWTVbf4qEOnTK6fh08J8Id	\N	\N	\N	\N	\N	\N	b3ec2a3458ec1a2283c65a485b3fa6f6:150dde13bd3ec4ca4f588467235d10fce1c3db6520e302d5aa29ded68711fd96da7fc62d004d1a0ab3fa92080a559e58aaa2abd3b14de01f5e7fa275947efb31	2025-01-28 08:23:31.86	2025-01-28 08:23:31.86
6NdbdxXB1hXQGgn9PzmHCZx4JBC8TRFR	3m65OryIv0GEmOgI9ucXh14BmTQuyqz3	credential	3m65OryIv0GEmOgI9ucXh14BmTQuyqz3	\N	\N	\N	\N	\N	\N	88b5cb784ceee6e2484bb1897d99dc82:e661b6b3a4a7f89e0e6723e42e9b922baae010bf0c01e47347655b5a6866e9caa69efc792b5588a9c131affaffe45b62e5c0431be6cbd7eb4d095ae161671eb5	2025-01-28 08:23:39.892	2025-01-28 08:23:39.892
fM8yB5WcrvBcWvVl97UVGe1ISdpp2Ayk	QNxZIWDhheUiCpNOfwJTPUa6hL4DgkqT	credential	QNxZIWDhheUiCpNOfwJTPUa6hL4DgkqT	\N	\N	\N	\N	\N	\N	9711a8d085ba87f7d592ca10df152101:0967a87fe5dc699a9031c092950da78a5dc8ed9274555291901126bf689115b65a6d5dfa34b2405631651596d926e3c9bf7018fd55fbca0118d8d82dadd34e84	2025-01-28 08:23:47.687	2025-01-28 08:23:47.687
FhxyEVTEcGHZlwiSCQ4H50U05qVbRLc5	UHj4LFwwwHkRgOs2dKcDNXJZDANU9u1L	credential	UHj4LFwwwHkRgOs2dKcDNXJZDANU9u1L	\N	\N	\N	\N	\N	\N	a151916af4dc6afcf741f9af2097b2b4:7b9c2be9e406fc9a8630170ea4ad6286ef8132344c170a8f628f67258314e72f37ada85aa2fb25a3a532befd3ebbca2abdf6e1640626fbdfbfcb5af711810ea5	2025-01-28 08:21:17.218	2025-01-28 08:21:17.218
y3rb6uDs5LzNii45B9FOeTSncH9KRvPu	3lNZl9TtBMguIjdbDN4d7VwBXJLz62sF	credential	3lNZl9TtBMguIjdbDN4d7VwBXJLz62sF	\N	\N	\N	\N	\N	\N	f150936ae1b42843426c06c61348d390:8c136a7309e426bae7b20610c4128dce5228659e75283b4aba24ae507751305cbe4ebea494e759a7e8f781726e906af2ce9900818f2de321df7f80ddae392ed4	2025-01-28 08:21:21.066	2025-01-28 08:21:21.066
939MKfTMB5CzL7Hdw5xFkfp83tK1A9at	Dhy44kjBkH3Rc20lUBDyYXw7Qkonfoe4	credential	Dhy44kjBkH3Rc20lUBDyYXw7Qkonfoe4	\N	\N	\N	\N	\N	\N	2ee6dbd904db6e2225e8b692dd781cff:b4766ee5732d9271fedcd965872c59c17338bf2e204958164969c2661337a8ad7789ab405af51062703033216e426ba9758ff10c1e2ed27e6b91f53f46973dd9	2025-01-28 08:21:29.367	2025-01-28 08:21:29.367
GCce8P2piSm54FV5TxsNDGQ5eCLPh075	nEPOzc8Q6mRDKJiygQVXNuCVD62SVSol	credential	nEPOzc8Q6mRDKJiygQVXNuCVD62SVSol	\N	\N	\N	\N	\N	\N	c699c9175f0202a7526622953ce47008:d05183b4b1f1800b27750bffbceb14b018e3f2692ad4fb31585be66b6cc0b35dc484e54680fb997de22c495345e48c9d82c7cac7d8c1ae518c80606fcf5c8b17	2025-01-28 08:21:42.351	2025-01-28 08:21:42.351
8v3eV3xCyacJbb70pF6e4Q9S55ehpmUc	9jUNfaHoa0kH7F5QtFuqtSZaS8vrb7e5	credential	9jUNfaHoa0kH7F5QtFuqtSZaS8vrb7e5	\N	\N	\N	\N	\N	\N	8fd06b7f8bf321dfd54073d188daa9f0:6e8cb9e77f6510b11c0053dac6c3a292bda52df323a3dc4e61617068c8c49470463b0e1a592187a263ba71178c3a515f103003b668f0ad4a98511c78b160e56c	2025-01-28 08:21:53.283	2025-01-28 08:21:53.283
qk6RARzErVd5EepagPpFcbXSvpgvSwkM	CUVNyLWxoGnxBCnJH6xsIbSj8CREa7gc	credential	CUVNyLWxoGnxBCnJH6xsIbSj8CREa7gc	\N	\N	\N	\N	\N	\N	f7df1fd26034a7f39ec6ded140911685:992bda84bc4fc24f7a84aafa8e938d7b35db5c8bd21b15975a8912cc3fbbf9cd96464d76ec1e01561e0323b48370648d4b203f5e9bb7a614d6bb65539ffbffae	2025-01-28 08:22:06.273	2025-01-28 08:22:06.273
Xtjhd2akzJZDwDlSwvynapHNOolHSmdW	oK4RilzEmvw7jrLj1TS3qNZymeto73pB	credential	oK4RilzEmvw7jrLj1TS3qNZymeto73pB	\N	\N	\N	\N	\N	\N	b57ef2b0596bd2bd171b61544fc9d312:cdf009ef63b7b0ce55cb5207860df0ff01993c8eb25bb5a82d0b72ae376b2601b98cb8fef6596506c04525a085c723704e867195d7e5953e0b31d11417fad72a	2025-01-28 08:22:21.22	2025-01-28 08:22:21.22
N12mzd8IFNJZjL5V2qLxvmGmVOZIwo6Z	4xROIGwXWjy4bq2jOyC6OPjPTosEb3dc	credential	4xROIGwXWjy4bq2jOyC6OPjPTosEb3dc	\N	\N	\N	\N	\N	\N	94b7a099bada9925281d1c98fb439498:59bc85fecc4e232737c3e01b3bf0bedd57a1ecc0ca356e4b5336e86d5bd692af673da33ff8031f6009290e55b19ef6fb869d4fccee24c1b91b6c12d4b621e390	2025-01-28 08:22:30.948	2025-01-28 08:22:30.948
kKGAG2Lz7eHpTkqETl7QirwJUvbuma91	k9rA5CDG8IKKF1Poi9rVMe2iJwt8XzH3	credential	k9rA5CDG8IKKF1Poi9rVMe2iJwt8XzH3	\N	\N	\N	\N	\N	\N	4ed77e3cc85b25d2e783cb391352504f:47730784b0fa867d3ea511b67a93707298cdef8e5f82987caaef3ecba7132865d797bd68857043df5614ef7bba1df4212d81cad913f6155159d207559d6e7ba0	2025-01-28 08:22:43.462	2025-01-28 08:22:43.462
jx5BOjNiyhkW2dDUGBoa2cf7Mu8C7St2	hrRn5Gi1FW2NjSgGdHxnn0kCc00mNuHR	credential	hrRn5Gi1FW2NjSgGdHxnn0kCc00mNuHR	\N	\N	\N	\N	\N	\N	0365c68015e9544e5ad595f53e28f58a:f991713304041bc9a2db21a0a729cd5ce887a0668fee956186a57cf05741b3dc6940a283648d139f7fa659502dab954f0d78ded214c7d88e5445bbd82d764555	2025-01-28 08:22:54.754	2025-01-28 08:22:54.754
fldlEMYDfoRMpcZ41bwlZfdYq03y0tEi	ttm9qPE1gK4qBTC3SHDFDBg1TDnC5qYd	credential	ttm9qPE1gK4qBTC3SHDFDBg1TDnC5qYd	\N	\N	\N	\N	\N	\N	4c5d0b58c23621ae1da55b99a847b07f:188d74db847853f9793f3a219ef0f4848542817f9747657b7e8634eebc408defb9304a73a8c1aff648259d604abc3f080ba9ef6222f3c50ca40826c85d0b2763	2025-01-28 08:23:07.228	2025-01-28 08:23:07.228
FJofzxeccBa4vXc9fSVVeVpvA3K4Nfat	KXYTGocImjisFroteIcT6ERheQ9uJk2k	credential	KXYTGocImjisFroteIcT6ERheQ9uJk2k	\N	\N	\N	\N	\N	\N	cf65e26f10a59d49ffd4ac9790a2dc86:a00f08eee9f3bfe24ad3f9181f78ed751f7d54cc5871a3c6521195cf0654087af5580528a17082564fa4f2e4b54223443aef04793ee4917cf29c16b316ca04f3	2025-01-28 08:23:20.827	2025-01-28 08:23:20.827
x1P3QqTrnLFrsEzlhZ3IUKAQKd3ChSsI	KxtI6Qwpsf6iL10e78HSpgroVyweNK9n	credential	KxtI6Qwpsf6iL10e78HSpgroVyweNK9n	\N	\N	\N	\N	\N	\N	5dac381d8d68e8186c9f8cb52b3ca71b:b22710b8fdfa3eaa2b8a9ba28d5d0fe15509cac64eb06ed80c825f162deb4a25f443efcab8adcff9b69cff93f48adad71f38799272551efed367023e4fb1de1b	2025-01-28 08:23:35.748	2025-01-28 08:23:35.748
f5z3NkR11z1GEHs1KpiiOUuDMy4jSZb8	WimNihdhAghkbQA3QcKu1nlmhE2bYzMT	credential	WimNihdhAghkbQA3QcKu1nlmhE2bYzMT	\N	\N	\N	\N	\N	\N	68d3e2da7d5aad5614ab592893a19615:cd2d24526987f7e0ead273c052381ed405ce85d7dfbc5d0aa60f617f0ec5ed13da677a4ddc9167067fdfa62af7982ff68420a38901afec4fb20e45c7418353b6	2025-01-28 08:23:49.945	2025-01-28 08:23:49.945
juC2EBnig4MiZc11ABiM7UGIUGOoowiS	afxLwTkcZVVJj1Nu2On6RoGaUA4hahKD	credential	afxLwTkcZVVJj1Nu2On6RoGaUA4hahKD	\N	\N	\N	\N	\N	\N	d6e9dbcb163d5fa9c7b070289f86ac4c:39711e9d2005b99b09c02cd41a18e454be4f7e976b26682f4ecab8ea39adc69f6d195b40e6678fb177ae792ae26a6e87eb647883df809154866bcfaefcf15107	2025-01-28 08:21:18.182	2025-01-28 08:21:18.182
vLHmdAh2KEUA1cUldgDngeB6OgDbWI8i	vSdhgocZuLrNPFg8v3J6K6DXHymwH4t4	credential	vSdhgocZuLrNPFg8v3J6K6DXHymwH4t4	\N	\N	\N	\N	\N	\N	2c0a3253d2256a2fa2de052b575c5265:e3f057fae8fe70a3ab9ba4531c716463ae028d7450297d0ae754e7eb5583e47eabe9d40960e86ec40632bb10d21f456a7db23e930bc884cea6c3662b1983dbb5	2025-01-28 08:21:22.07	2025-01-28 08:21:22.07
QdYugdeaZ4EhnzrxHaJRXHsQontDWBpl	Cfd78sXnDfbBNlqQlBqlron5dIHxcchS	credential	Cfd78sXnDfbBNlqQlBqlron5dIHxcchS	\N	\N	\N	\N	\N	\N	a0e3dd1a18ce1ffdd1c8829ce1c8d7b3:27335eadbee32a1da59461092e978d28cc780ace3441b8346b071e6076c836702794bf860dc917021f59f95e6e26ead52fd87d3a955ac6ef02d935b3f3ac2d53	2025-01-28 08:21:30.333	2025-01-28 08:21:30.333
GCd6l3MILIBP7pKQejCMjXYtO737MdFc	3yBpsDz2G7ssxFHSQtdqd7JIEWSBONnx	credential	3yBpsDz2G7ssxFHSQtdqd7JIEWSBONnx	\N	\N	\N	\N	\N	\N	9161318f8e1128ccda35c705c3fa6920:96f66abc6c83fb974a9da03ae610e4b90cc90f58c58f3a9dec08e29b4f2a6436ed6987235c272e7cd35dc0c23049a98213e82b7a7e263251ef1d9b09abea45bf	2025-01-28 08:21:39.379	2025-01-28 08:21:39.379
8hSteVurl8mOm4eGdu45fssRFGr1JYK7	aCCfRysppPz4eAda5gqzM1C2eQ6tJeYZ	credential	aCCfRysppPz4eAda5gqzM1C2eQ6tJeYZ	\N	\N	\N	\N	\N	\N	a11970fac9b5f36c27f7f9981efda4d2:a0b1763aa41da91c63fa2e21421f240a4b55cae63c5f9fb8de3c1b04282cded3d1bddb875e4812206a2c7fcf516bc20d1ae6a06e22fa8634a71bf895131b8f4b	2025-01-28 08:21:54.36	2025-01-28 08:21:54.36
GHeWaHd41UHl5DZe7qHftA1zXYrYhqrB	695HxVaeRRi4GZShnFmzlEMJrzByB30a	credential	695HxVaeRRi4GZShnFmzlEMJrzByB30a	\N	\N	\N	\N	\N	\N	25715d4475d61e390f93aeb14cc9cbc3:52f25394bd469eb7159c9881f37d728e85306151e3603ca052fc80816353855b5ff03a5826e4ca9973da762dce26bb7711fdc6398b88f0fbf9a0ff2f2c88bd13	2025-01-28 08:22:07.365	2025-01-28 08:22:07.365
ki7MWuuiZeu2NI4TtLpMBApODeqcicfN	1fuowmTo5pin0u10j5kqGUzEB8LJ49wD	credential	1fuowmTo5pin0u10j5kqGUzEB8LJ49wD	\N	\N	\N	\N	\N	\N	43e940eacc84be282ec05e21725f5fc5:17cfab496b7c704da854edf62aaca820e7699b5a7e119f5e92dedf89b6668a8039ba8125d7af7860062aaa3fd10e8a369a6f3cfc4523ee2409f043cbb36f223c	2025-01-28 08:22:20.112	2025-01-28 08:22:20.112
NA5vSmJkXw3TXMlacKaOCrokbNuFXp7o	1Mfe83pgAzuKE5xmqJL6Dh5VqXcQ8jUn	credential	1Mfe83pgAzuKE5xmqJL6Dh5VqXcQ8jUn	\N	\N	\N	\N	\N	\N	0f21f6c8cb474632a22e1cbe6e0de6f1:b4a39619b83c38e1b37b14a9cb738c53fe9dccef395ee549159ca3797e241ab65a9c2e326b49ae93c07db9d22bb2e75a5b94babdebc2bcd9a2f8b160648a6cb6	2025-01-28 08:22:29.927	2025-01-28 08:22:29.927
h2maddAwRNmpaLT4zfT0rxzeeMVOEgVm	MqzARMkQyTGdNRrPMOjvwsGussg5fzY2	credential	MqzARMkQyTGdNRrPMOjvwsGussg5fzY2	\N	\N	\N	\N	\N	\N	2480fec23c0ab864245b1f4634e814db:a791dc603fc854bb6f47d10dd8281dd9c5861e3e878bb17dbc85f9e23d8e494813e5f7e1f0114eabd2b2515e78111897553c9306ae9cf2f5e8db95acf18923dd	2025-01-28 08:22:39.121	2025-01-28 08:22:39.121
z2hNH4IEspaFRSp24ghqK6hDckyBsiNC	GAAvrhfX6mxfj8TBSZW0L5a03cNgvVP5	credential	GAAvrhfX6mxfj8TBSZW0L5a03cNgvVP5	\N	\N	\N	\N	\N	\N	8e5c514b1705fe02f42d868eed69fcc0:fc6a41c724f00874fda839bba5bf3172f13bfd91f8b9dc1e1d657b26da8834c07987099bd32f50ecd7c0869429e8bc4ce31296ec02d54049cdabb3db73cb6b5a	2025-01-28 08:22:45.409	2025-01-28 08:22:45.409
svLktJqh5ET4EnGO549oe7QIM3Gdtap8	Mww2jtnJ3eQZZPLczdvLSPAI4rdGfY4r	credential	Mww2jtnJ3eQZZPLczdvLSPAI4rdGfY4r	\N	\N	\N	\N	\N	\N	56fc0845c8f488ccad732c4c74de2a89:1c5d390aba76e325e8edcf66d4aaa7e0ab17be28b7f38d9e5a8b45fe54277a294dc790227e736d21ee16b67c746b0f85e72b5334c5752bf95d1fbfc8af0f562d	2025-01-28 08:22:50.641	2025-01-28 08:22:50.641
D1dcoK5DCoqOutjBF9WY8TiXdoZ8UDgw	eAw8xqJTMWYLzkuxQMgAnpdJ7xhKvBsG	credential	eAw8xqJTMWYLzkuxQMgAnpdJ7xhKvBsG	\N	\N	\N	\N	\N	\N	905764419e07c79c8abc8e567a71e2e5:62cc547b577f3797f75af418b7858a2e912dbc5cdef8d5d4b5f056bb7e64fdb7c8c857423c0b12543701cc9739ac0e37aa1a2665b809fb46419b9b3d1df14591	2025-01-28 08:22:56.919	2025-01-28 08:22:56.919
vthhtIOB1bBPGkZhlFOCdQZIIqEqhLLc	PCRSxZWfuYbAKxrWFVgWgJfNdOUPCr5v	credential	PCRSxZWfuYbAKxrWFVgWgJfNdOUPCr5v	\N	\N	\N	\N	\N	\N	09c4bfc2ce04e80d9833d8aef42492e4:8b992a5e138b26c982f815125a7142f97a5d74ae117ac4961b506d815a65d74b7c09964c0821bdfa885f69f36be4da01d53a7a19d748abd19a8c4c4d3462fe75	2025-01-28 08:23:02.977	2025-01-28 08:23:02.977
vAUzjpojzmookE1IK079HkrccWXjSRU5	EpBgg4xEErcx0cX3exJEizOa146fijVP	credential	EpBgg4xEErcx0cX3exJEizOa146fijVP	\N	\N	\N	\N	\N	\N	92667fe2d04e89cb28fec89200a87802:fa6bd3da0447c47f377c69a58f392e2df1ce20b2d08a91215452223aa8c8f1aec7fc3ee8a7ee65281c24291a270e8ee16663bc52e25c0d0a6a61d7c0762f515f	2025-01-28 08:23:10.455	2025-01-28 08:23:10.455
MrGwWMrwPlOxvluS93SfBw4y1YDwsyhm	NJuhjFgqaVL6riXKk5VuDwNMmug2QUWk	credential	NJuhjFgqaVL6riXKk5VuDwNMmug2QUWk	\N	\N	\N	\N	\N	\N	5f78f7de012285e87e771de63b1f16db:077bd04e108be932de3b24bf173a0702be9452cf454bd6eace85251876f17c76aea22d23ec9fcc5b3357008cce56f488abb47257e6c2d21407b7b045c05666dc	2025-01-28 08:23:23.052	2025-01-28 08:23:23.052
y80U3wmLsoWxeqF9ZzB5COZXHob367Bo	TrBlWR6tsenY4uZOpqKiZJxKGjs0cEod	credential	TrBlWR6tsenY4uZOpqKiZJxKGjs0cEod	\N	\N	\N	\N	\N	\N	82f769b30e4cb0cafbbbf15000d2c6c7:e0f79a36528b8a62fad25235804047809eabc73ff87e5fbb2f215400a9b4da7c1f4aa19bc2a2e427ecf8054ac3dee065bd08a54c1403d7793e4a6176c8503a27	2025-01-28 08:23:33.81	2025-01-28 08:23:33.81
3FWXofjY7nyrWrFbLWWbR97wRIqK67ls	VySeTjjn44qRBP1hm7NjkKPCRWTEWcMy	credential	VySeTjjn44qRBP1hm7NjkKPCRWTEWcMy	\N	\N	\N	\N	\N	\N	28d8afd079de6af4bfd5722bdcd6adf2:b69f312d81b752de3ccb87a0ed06f8a45cccd1ef23dd9bf4cbd1914ebfd94bccdc3af398a5e48029aa21cc08d0913abbb5127ce08aef1f3712d5c4ffeb3bcf17	2025-01-28 08:23:41.806	2025-01-28 08:23:41.806
4bePuxNS03tLrPWlInyj2ZDpn8kT8gyT	OTPHgciwLUYG1EhgT7Wp8Pq91nPXCdC3	credential	OTPHgciwLUYG1EhgT7Wp8Pq91nPXCdC3	\N	\N	\N	\N	\N	\N	7d6c531e233c9236131e38f473829a52:76480ea34b0286a3b3192f7669bb00bf18ee2d30e86cdf33885e107d166636cae9ca6b563d8189036a7c9f4a3bff2e377f6745be582e39b9b7184126a5087cc7	2025-01-28 08:21:19.138	2025-01-28 08:21:19.138
eWeWNB6UuestysI1Br2qCy68uFyizh5D	YGBi0YHlK6Ojnc6EQMJZYWTiQk2x6lwZ	credential	YGBi0YHlK6Ojnc6EQMJZYWTiQk2x6lwZ	\N	\N	\N	\N	\N	\N	dc53e8a5bb2a85c1daf25c6d902cb741:e2c12a8b6eea4e6220983521325281f092f0d179be0cccbacee519c1cae59748f58e69f49f6732607a41036f9dcdd4355b3b88ade6e41d3c9add2d6fb198d246	2025-01-28 08:21:33.55	2025-01-28 08:21:33.55
los6r3CLVbRas2IPSHnjTFaG1jJahbb3	SR43AAbYyXia3rL86ohGydsaPigd6j0S	credential	SR43AAbYyXia3rL86ohGydsaPigd6j0S	\N	\N	\N	\N	\N	\N	4bdb47d1e5b64f7f4286e18522f8386b:9100d7b035d2065f9c6bc3ed20828b183a08f58b18b4e0a4addd6c81f71cd83546ee774137bc48454621c2e887f683a790045462661ae7f4e0be5626f84dbe66	2025-01-28 08:21:45.954	2025-01-28 08:21:45.954
fOcgHkVKQcdxHL60Z6l3oKkh3vZqkRau	AMDw3AUhg9eMv3lB3qkUdgRZyIprFvQl	credential	AMDw3AUhg9eMv3lB3qkUdgRZyIprFvQl	\N	\N	\N	\N	\N	\N	fb6e220589be52a681e497b77e11072d:b70913514d7f5b2a5c7f0b850c2218e1d39d9c5c20f553767010c5a8a40ed0997ac848f67fe9296472a9530e5e7ceb1754f10fe1046ed15810ad135cf4316f38	2025-01-28 08:21:56.498	2025-01-28 08:21:56.498
s05fdxeT3BIZjCMr6sKOrnSUhQYYeDuU	CQRDiOV8a5GfIocpwmnVNrBv9Rx6VS9K	credential	CQRDiOV8a5GfIocpwmnVNrBv9Rx6VS9K	\N	\N	\N	\N	\N	\N	b356f1a4b53d2be024aa86b24918cb78:dcff2b70a3ea9f8177ea1d6579a95e021eb1ccec1e0a6fa08b8ba2acc702b9f5badf22e3e68bf4b2c9dcbd4b01b341d04aa3d2dfbd73bb4d4c66a0cef733d3a9	2025-01-28 08:22:09.711	2025-01-28 08:22:09.711
T9zjXErD0eY2mcMEw23Szrmfa5b66SGc	dQArYtrlCmsskidnnvJEZn4uwlbh1q15	credential	dQArYtrlCmsskidnnvJEZn4uwlbh1q15	\N	\N	\N	\N	\N	\N	93f7e0f76c3ac82ac5374237fc9df854:1d534388fb504b32e820d26165121130c2c19154875b9077e474c27d58ac3d5b3c3b6a548b17d1e3c823083fab1fdf4f5e56e16b10b7187cbad418019f43544c	2025-01-28 08:22:16.347	2025-01-28 08:22:16.347
qu3dIWFsDYuQAE2Xbtk5pGgLXzRcAnwo	UhHtU240C1MSBPhJ7bIyfLHSybpf25de	credential	UhHtU240C1MSBPhJ7bIyfLHSybpf25de	\N	\N	\N	\N	\N	\N	b5d6d1f0d5631c6d4c1644448118a016:aff2e6799f877b13ca7c96587bdcd3e50893bda90b646278c536f84a39eef4fcc4dcfec017cc6b5539b23823f3e22b38f4a9dc21d58c4a1243979d7b53daf59d	2025-01-28 08:22:27	2025-01-28 08:22:27
M0no5mOLmohX6cZs1QYdCfDIkiyhwDeN	2GyufSGsJB9JeUo5nDqyqQTkCCre6Jhv	credential	2GyufSGsJB9JeUo5nDqyqQTkCCre6Jhv	\N	\N	\N	\N	\N	\N	f4999418513fdcfb3ef3831c01ced486:a63aacce407233946bb404043b51fdb143d56d034bdd0a2bc50003e4d6aacdfb63d6ca6ef58b07efd5fd21207f169438db871a0bad28934eeec4187dfed91c00	2025-01-28 08:22:37.998	2025-01-28 08:22:37.999
RdwMinO1AjH97lwMwdmBMzWX2oIGPuJQ	pglNk8hBxfAUXnpwuijZU2ef59W5TDYu	credential	pglNk8hBxfAUXnpwuijZU2ef59W5TDYu	\N	\N	\N	\N	\N	\N	1b2c5c7ea7d2b76b7c77acdc89f8f907:59786ccfe794dd7dd798d73958bab4e5609af9f36ea1bda8f527e0e315258b1c0c4ad34725f935edbd88c76cfe0a3d0761c61fdb76f164016d464332750e3259	2025-01-28 08:22:48.284	2025-01-28 08:22:48.284
pHsI1LRsqjTqUdU8QPbRMALZShHVp5Jw	aeutdMCiPGivvRoAEvhfQowEe8g3NCYi	credential	aeutdMCiPGivvRoAEvhfQowEe8g3NCYi	\N	\N	\N	\N	\N	\N	b696d46c5138d35c6715c7c9f84cea2d:0969b6b6a6b51cb702196c3cf8f9a09f605a437bd5827b05964eb6b779e618b8504b2787ec447a482c6c0a90221849dc6ead80e61cd91effd90e2460c6fb735f	2025-01-28 08:23:02.008	2025-01-28 08:23:02.008
VTMuN6SKktH6cJyaDVYdMZ4AqzRerh9N	Zeu4N6qzahQI49n5aiw2gSypRQO3KnLS	credential	Zeu4N6qzahQI49n5aiw2gSypRQO3KnLS	\N	\N	\N	\N	\N	\N	31cac91df638ddd70f5e72a89991e941:8aa3707433538cd717973ff10e79ead66ab04f9dbf59a114105ac6a541a2bd91d2a53e44c5088c71069c196a24e32655457a5d0049844fd07180a141da5336f8	2025-01-28 08:23:12.434	2025-01-28 08:23:12.434
SzOquLKo9F7TzXkBsAnXHx6iuDCL17P6	lmeDwjNujgrZlyhBhhyQCDZFeky0dsPd	credential	lmeDwjNujgrZlyhBhhyQCDZFeky0dsPd	\N	\N	\N	\N	\N	\N	a7393352b104f0cd9bbe47bc89de7ba3:e4ea11eef1aa710bb609c718932328ac01ad6f9bb379d2ac4008452f4552f1aa1da2187e15c654941e48a67310ca1190d6aa4f6eba09318e3f9648cbe0de0171	2025-01-28 08:23:21.993	2025-01-28 08:23:21.993
bW7mN1lk8W1NxmUHgWOLFMxjJhV3TDTG	GaCwSsYolbDwpcI68II06Ml8lkYQuJDe	credential	GaCwSsYolbDwpcI68II06Ml8lkYQuJDe	\N	\N	\N	\N	\N	\N	3f60543e80d73f08c711c36ea670c17d:aef37f6e50f803747130e92ccc656067839f0955a2c6762f195ec0a26c57b50f391f10b131acc65313468a738b121d3c6d31e5bb0e8416f2967f171655c5ba66	2025-01-28 08:23:34.775	2025-01-28 08:23:34.775
oToLTNTbUr7GNiv3fWa8BvU2DyN59ial	UNSHGrpU2p1jt8qh9TxS57qwKxP8ySL9	credential	UNSHGrpU2p1jt8qh9TxS57qwKxP8ySL9	\N	\N	\N	\N	\N	\N	7b31d1d7b6245ed16733400ef1b28512:691f58f6d53582120dc0a793104b225004d7c657f495b8ce3ed37fc1b35dc7bfabddfb654be493ecd050c97dfdbe9b08be3e7c5c238d67f1419cc420db2a23a9	2025-01-28 08:23:42.898	2025-01-28 08:23:42.898
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.categories (id, name, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: category_assignments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.category_assignments (id, team_id, category_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.comments (id, user_id, ticket_id, details, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.department (id, office_id, name, created_at, updated_at) FROM stdin;
yjuhcssmcurrcggxaenyaeyfrrsz	zeltsnmgzbbnywxgqdxiucthdiws	Human Resource Department	2025-01-28 06:30:15.845701	2025-01-28 06:30:15.84
ubrcucqtennvdfazhnzbyaltislz	zeltsnmgzbbnywxgqdxiucthdiws	General Services, Property and Materials Management Department 	2025-01-28 06:30:55.155873	2025-01-28 06:30:55.146
yrhrmiavyasangqyzqfrvngvwjcg	zeltsnmgzbbnywxgqdxiucthdiws	Information and Communications Technology Department	2025-01-28 06:31:25.808774	2025-01-28 06:31:25.799
watlwovawipmrowahzulrwryrgqj	ltaropdfvglqjwlhnmumiumznuli	Accounting and Financial Management Department	2025-01-28 06:32:45.013104	2025-01-28 06:32:45.003
rrvpwbuhvcsvdhpfzptzbqgnamsl	ltaropdfvglqjwlhnmumiumznuli	Commercial Services Department	2025-01-28 06:33:14.583923	2025-01-28 06:33:14.573
ftsnedhegjgalhwjcejnfophcnoa	rmmdpirqnschcsgtlzmvjcauhate	Corporate Planning, Internal Audit, Community and Legal Services Department Environment Management,  Relations	2025-01-28 06:34:49.886618	2025-01-28 06:34:49.88
paszkkyesfppvbgtethzihkswbou	mmaepuqalyxqstnwealtpbzrplhy	Production and Sanitation Department	2025-01-28 06:35:22.000979	2025-01-28 06:35:21.989
grosuwbzfbrxvhnzqysdfzqtbmvh	mmaepuqalyxqstnwealtpbzrplhy	Pipeline and Appurtenances Maintenance Deparment	2025-01-28 06:35:59.33157	2025-01-28 06:35:59.321
tozqaijlyshutotfjebiucqyfqkb	mmaepuqalyxqstnwealtpbzrplhy	Engineering and Construction Department	2025-01-28 06:36:25.489248	2025-01-28 06:36:25.478
\.


--
-- Data for Name: division; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.division (id, department_id, name, created_at, updated_at) FROM stdin;
ioqmkiwamtfoxsnhlxqnhlkwlrdk	yjuhcssmcurrcggxaenyaeyfrrsz	Recruitment and Personnel Welfare Division	2025-01-28 06:41:38.105446	2025-01-28 06:41:38.099
ufyuybznquqrvauleyovgsljcsvm	yjuhcssmcurrcggxaenyaeyfrrsz	Training and Development Division	2025-01-28 06:41:48.057604	2025-01-28 06:41:48.056
dlqhuraucmahlgthsnltkitkcprt	ubrcucqtennvdfazhnzbyaltislz	Building and Grounds, Transportaion and Water Meter Maintenance Division	2025-01-28 06:42:56.196257	2025-01-28 06:42:56.187
mgletrgpgzqmkdmmmdmrvekicgpo	ubrcucqtennvdfazhnzbyaltislz	Procurement, Quality Control and Property Division	2025-01-28 06:43:51.392851	2025-01-28 06:43:51.385
dgijbrptgrjeinbuxrjovufllhox	watlwovawipmrowahzulrwryrgqj	Treasury and Budget Division	2025-01-28 06:44:37.938575	2025-01-28 06:44:37.929
hfzczgbmhkiykslttutrfinryqos	watlwovawipmrowahzulrwryrgqj	General Accounting and Payroll Division	2025-01-28 06:44:50.740248	2025-01-28 06:44:50.734
hznsduofvgtklpwnyhtfmeeijpoq	rrvpwbuhvcsvdhpfzptzbqgnamsl	Customer Care and New Service Connection Division	2025-01-28 06:45:24.87676	2025-01-28 06:45:24.865
qpqstfxyoqphahgvpjvzwfaurero	rrvpwbuhvcsvdhpfzptzbqgnamsl	Billing and Accounts Division	2025-01-28 06:45:38.123646	2025-01-28 06:45:38.113
lhpvmqehnpghpzwieijisxueixlm	ftsnedhegjgalhwjcejnfophcnoa	Legal Services, Management and Operation Audit Division	2025-01-28 06:46:31.980593	2025-01-28 06:46:31.973
tzulwlejwreutxlkknabsuumbdew	ftsnedhegjgalhwjcejnfophcnoa	Corporate Planning, Public Information, and Community Relations Division	2025-01-28 06:47:20.56507	2025-01-28 06:47:20.557
ofjnxkyobwzfjtnqorpdmlhiyvdn	ftsnedhegjgalhwjcejnfophcnoa	Environment and Watershed Protection Division 	2025-01-28 06:47:44.259625	2025-01-28 06:47:44.25
sfmjagkvhhiwhnhipljsahsmonep	paszkkyesfppvbgtethzihkswbou	Water Quality, Production and Electro-Mechanical Division	2025-01-28 06:48:38.392426	2025-01-28 06:48:38.383
vovdidlevjwdubcagllodlzwhtwk	paszkkyesfppvbgtethzihkswbou	Sanitation Division	2025-01-28 06:48:48.199094	2025-01-28 06:48:48.198
zpjhlrkethompvebfsemzgyvrvxo	grosuwbzfbrxvhnzqysdfzqtbmvh	Water Distribution and Restoration Division	2025-01-28 06:49:20.718693	2025-01-28 06:49:20.709
suuehvxepxcuqjazzxgrthweryqf	grosuwbzfbrxvhnzqysdfzqtbmvh	Leakage Control and Non-Revenue Water Management Division	2025-01-28 06:50:07.278972	2025-01-28 06:50:07.25
ldqqwbbqrhjqomiqaiqyxfltfcfn	tozqaijlyshutotfjebiucqyfqkb	Planning and Design Division	2025-01-28 06:50:39.220584	2025-01-28 06:50:39.211
dgixldayudvamwcglcdzkbrevfdf	tozqaijlyshutotfjebiucqyfqkb	Mainlines Expansion, Rehabilitation and Civil Works Division	2025-01-28 06:51:05.895032	2025-01-28 06:51:05.885
ugidjcqppbjtjxgariifmfarudip	yrhrmiavyasangqyzqfrvngvwjcg	Systems Development and Application Division	2025-01-28 07:37:49.732906	2025-01-28 07:37:49.723
pdwzdjxrvxhunaunhxulyrwdkmhm	yrhrmiavyasangqyzqfrvngvwjcg	Geographical Information System Division	2025-01-28 07:39:17.254189	2025-01-28 07:39:17.245
\.


--
-- Data for Name: office; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.office (id, name, created_at, updated_at) FROM stdin;
zeltsnmgzbbnywxgqdxiucthdiws	Office of the AGM for Admin	2025-01-28 06:28:48.768437	2025-01-28 06:28:48.757
ltaropdfvglqjwlhnmumiumznuli	Office of the AGM for Finance	2025-01-28 06:29:08.702624	2025-01-28 06:29:08.697
mmaepuqalyxqstnwealtpbzrplhy	Office of the AGM for Operations and Technical Services	2025-01-28 06:29:22.532302	2025-01-28 06:29:22.525
rmmdpirqnschcsgtlzmvjcauhate	Office of the General Manager	2025-01-28 06:33:39.08566	2025-01-28 06:33:39.077
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.session (id, expires_at, token, created_at, updated_at, ip_address, user_agent, user_id) FROM stdin;
00xNO5qnGrRbjzPyeeXmbcFDTfQZQPev	2025-02-04 08:23:52.294	A3flJsT8geEBxUNYsoYFo9bbnwJ5s5mL	2025-01-28 08:23:52.294	2025-01-28 08:23:52.294			ZkZGxPjDI7W4BR9urJ2wHj5Mzc4KVunN
hsSA7aQJ1V4qYPAo36bB8RZ2BMyA6F6P	2025-02-04 08:23:52.295	XA9oYj8f0rt5jKNezxr9Q5tVkEAO5yei	2025-01-28 08:23:52.295	2025-01-28 08:23:52.295			GxagVwlU0m28JJWwJgbG5PnClyvnBtIU
aVmhXJmelB4l9JflKQ8m2giRe032n043	2025-02-04 08:23:52.295	BhSCnZKmwKKuhybn4k7cc1hfRAio6cRU	2025-01-28 08:23:52.295	2025-01-28 08:23:52.295			DaeACknxGUH6NusRguwhLLuu2d5QUbQY
Q6N26AGE8g28ovAYPglYLnUBOdbGJk22	2025-02-04 08:23:52.295	jkeUAa574u9O9xIvFpfZLTiD8KOm2WTt	2025-01-28 08:23:52.295	2025-01-28 08:23:52.295			aB5YCt2pHi0uakHQ8SrVuUxMFvFlWODe
UGpgwWZ6mdd9BqqJbMauEm9KZgGErR2I	2025-02-04 08:23:52.296	a0WGBrtYMSSGU1UxGIWxPg5tgZSxUOLu	2025-01-28 08:23:52.296	2025-01-28 08:23:52.296			Sfcf52QLeJWY4QbZsF9xMtB2GcXYkWmf
VjfTaZDNqjkRYyqBD9mNvluU8Ab1xrj7	2025-02-04 08:23:52.296	T7QoKIs4lj2IxagcbwhiFi7ayjOpUfsg	2025-01-28 08:23:52.296	2025-01-28 08:23:52.296			AlGhfhRtdMh1bqmXrEYj1Qm2DtE0vsId
FA0J1X8jZRy9XU1VvJqx0APb8Fbjj6CB	2025-02-04 08:23:52.297	Ml8SCarfi6yry1zqQ2qbDIsa6xNKDbWr	2025-01-28 08:23:52.297	2025-01-28 08:23:52.297			5xu9mwV7eHvbloEua5avHStG0jKu2Ggg
TDeH5rESdZ52AHwSsibSId2gYViHBjpo	2025-02-04 08:23:52.297	IJQzjzXWFIcqVlJNSxGTvhda8Zp1Nlwc	2025-01-28 08:23:52.297	2025-01-28 08:23:52.297			Bun2586jHvNmdw1AWNCCrVrdgj8UzJAn
5l7QsapmaP8vqBI5h7CAODek2yUEaySF	2025-02-04 08:23:52.297	XwLhXI3HCTUjZZqhpR25UF6vagNccu7w	2025-01-28 08:23:52.297	2025-01-28 08:23:52.297			U5o7KCBc1XjF1h75tq4CMgxNHeabHzuL
hwKEztk0GCEg8rQtpGOJyCihA7L83Ttx	2025-02-04 08:23:52.298	Ioar3YhtgqVypBvxnnChjRGMSWbystSb	2025-01-28 08:23:52.298	2025-01-28 08:23:52.298			fhzA9xqcvSmYPGki0cy6xhU4vF1RaMlf
Y2MM5eaBBw4r6HYNx9SgyvmjTOR0pmdz	2025-02-04 08:23:52.298	PrerL2RQbvW54i1UHtUqfnfYD3eKSSgp	2025-01-28 08:23:52.298	2025-01-28 08:23:52.298			WNSuxNPgv9llyVX5lP62iDGP7W90y6M0
7GpHCRVVdYOreBP1fEp1YgwpOBnqHLh0	2025-02-04 08:23:52.298	K3iw22oXff4f4OTRxPpYx3dHqpYGhLU3	2025-01-28 08:23:52.298	2025-01-28 08:23:52.298			SavV7FLpQulzIVUqFjWFS0BKuAEqNcIo
OhNwDwPaBipDTCccobLXrOCfOJrSHSJo	2025-02-04 08:23:52.299	d1skt397cTtO8P8xrwvAJAdacI8hAtgL	2025-01-28 08:23:52.299	2025-01-28 08:23:52.299			UnIOIOn4ck24q7wkxX7obf6bgBpW97Pi
sE3bzfb2nO10sQiKZYQib5zhmC0NYR4g	2025-02-04 08:23:52.299	6sBJFqahErs2WTXkcPpYcbm3ipDhGCGw	2025-01-28 08:23:52.299	2025-01-28 08:23:52.299			ADQhInRcAxyUTruOLypvLbdSPh3GPEoa
d9oyzeSQoTzkszRPrnqhK232d0KKGIqK	2025-02-04 08:23:52.3	jFaAZoZi1hLq2HpGUuheaFrbDNveIHY3	2025-01-28 08:23:52.3	2025-01-28 08:23:52.3			ncnoO0s18rKRlrEYJ4FbcR02qFjkMvkr
k3vgJeRnqJPGrYXAcmd6E4ClfkXC5rE2	2025-02-04 08:23:52.301	A2uRURN5CfmonWYXeateI1Rg7jdaiBIl	2025-01-28 08:23:52.301	2025-01-28 08:23:52.301			MVPoXGOG442vJVwGnjg0Us1z6nLaZ2ZS
kLh8hytvcMfTCu4gFvhA8YGndnccjPlq	2025-02-04 08:23:52.302	9IOvgDpVdKn9O6XozCzx5owrDK5ncDRn	2025-01-28 08:23:52.302	2025-01-28 08:23:52.302			dgzQMss9eafQYuoK9X3q0mPj4zwcsAib
JrliG7J9KgCgjG8jIewAQ0uYD2kyit1h	2025-02-04 08:23:52.303	esr4vfGxDiGhA6qX9KzYNel4sSsldv1g	2025-01-28 08:23:52.303	2025-01-28 08:23:52.303			UHj4LFwwwHkRgOs2dKcDNXJZDANU9u1L
mI0A18pF4GuwQAmkcyaLxL8GAol7k9nE	2025-02-04 08:23:52.304	DC4eOQcyA5wcVk1liAApDVfxew9NVNxc	2025-01-28 08:23:52.304	2025-01-28 08:23:52.304			afxLwTkcZVVJj1Nu2On6RoGaUA4hahKD
QrhZ8cBRVPlvxyCzrz2f7gbfCkDWHFRL	2025-02-04 08:23:52.306	cRZUZqHUgmWwlBSmEkNztgyV8IBtlT54	2025-01-28 08:23:52.306	2025-01-28 08:23:52.306			JQGHfwjFZN8Nf3PZws5TCq4JVhQHIner
F6fjwQc2CmvKndYfu6KrQN5hgG9IUD5p	2025-02-04 08:23:52.308	x3BgPRq81EBg4JJNQtymu3oCJprzxPWv	2025-01-28 08:23:52.308	2025-01-28 08:23:52.308			CRhXIMQMZl7ZYbHCX0aMpVrOF46bCCJa
0oR9Ri8doBr3cmZuHkCa1cUocbg28TGI	2025-02-04 08:23:52.309	OmT2ReOdefsRF4uL1da7zzPSiMDvnpds	2025-01-28 08:23:52.309	2025-01-28 08:23:52.309			fCmXblAhcAnr4FdBUn6wslr45MR6YVdj
cgU954O2LHGMkJLDwE6UilyYczbjxdEv	2025-02-04 08:23:52.309	Ffrs2aWA0qa6pwxMPd0jrB4cw1kWHORZ	2025-01-28 08:23:52.309	2025-01-28 08:23:52.309			EOGLfXnjhMHTEBK3WcgLUwcDFuRToOY1
UuQK9XatiRNAi3fzay52bvXqHD1enbDl	2025-02-04 08:23:52.31	XPRYj9Anb36On9STUahcRf2eBRmKXnJo	2025-01-28 08:23:52.31	2025-01-28 08:23:52.31			MwoRXohC6PgmKyKIw2gDZKXY7O6LHU88
epeO39Vo6V14mb0Zw8nSuAOltN5XdNwN	2025-02-04 08:23:52.31	cHlYya0hsPkn618Scvp5dxFp6a3OrnDK	2025-01-28 08:23:52.31	2025-01-28 08:23:52.31			dhy2mU2H94u99xBuqB6E1wKTd8wVOVEp
C1SyTOF5ZgJt4P8OYwNgOcY7ggkAMcg3	2025-02-04 08:23:52.31	71dxJ7DXJyBQXUfdiNQszuVaYBc6mql1	2025-01-28 08:23:52.311	2025-01-28 08:23:52.311			3lNZl9TtBMguIjdbDN4d7VwBXJLz62sF
AhkcFFqvZfnqLmxM0UnLp8SuBn85itR6	2025-02-04 08:23:52.311	ZC5KYTyAgZdfE9VDV9XKL3ry0nYDOe8j	2025-01-28 08:23:52.311	2025-01-28 08:23:52.311			vSdhgocZuLrNPFg8v3J6K6DXHymwH4t4
TMhdaijg7eWsfw8TkiSkDkNWAaOdCDJZ	2025-02-04 08:23:52.311	6Wy1zvaWQ2xMAinjmGaAbwl0eB9BfI8j	2025-01-28 08:23:52.311	2025-01-28 08:23:52.311			BIVaPos98Z98kdYUkBzuSLwVi4qIS8kh
LmO6FGY1sC0skWA2OJ7bPkoCzPtp2CJP	2025-02-04 08:23:52.312	SFMmd1SqS4lSdMllzKaC76mzCq5c0aek	2025-01-28 08:23:52.312	2025-01-28 08:23:52.312			zCwu4CPP3dKWMQeys7bOVCa4d5hHXxbg
Qv1TAj6qY0pJH8BkLYbYWhozKJkPAiLK	2025-02-04 08:23:52.312	ly8ZM8UmilMZvgfAnxfSlqkIl5T52tQR	2025-01-28 08:23:52.312	2025-01-28 08:23:52.312			OTPHgciwLUYG1EhgT7Wp8Pq91nPXCdC3
zb518SzxFLRfwLmEVajNfRGb9Jx2omZP	2025-02-04 08:23:52.312	gjGanN19p9bveL03NJgqjgqEdh6610vj	2025-01-28 08:23:52.312	2025-01-28 08:23:52.312			Eo1gaLjeZSNREzuw2h4I7TGir39geajS
apNI9L3A4G8sGl5BTpfHKVdvEuhaaaAf	2025-02-04 08:23:52.313	XLcmv7BOlWiCrR2IQkRreToiQboaEb4U	2025-01-28 08:23:52.313	2025-01-28 08:23:52.313			abd4v6wBfYniQLo2FdnQpG09SVhiqm3f
qKfhYzhJf9dHn75ilTD0dUPMkTaPujLD	2025-02-04 08:23:52.313	qVGrU3pXJgpOGyVOynV5m9lpgrEpCkew	2025-01-28 08:23:52.313	2025-01-28 08:23:52.313			YSTg5AEvBGrQyAWLditxSK1O9bHVC0Nq
I1qSB9hK94GyR7B0BmffVfVsvsosbWO6	2025-02-04 08:23:52.313	yNgbcLS53IApssV0KxSMVPIoICSOJCFA	2025-01-28 08:23:52.313	2025-01-28 08:23:52.313			GiHghnLHmIL1Ba85FEJRnVCcncrpkX4l
kqbr4qXj1kEXO3iQWAP43WxckJsNsYK6	2025-02-04 08:23:52.314	RO0Dm7F6wSLFsx0FeBxmJ4GdgUtHQH0i	2025-01-28 08:23:52.314	2025-01-28 08:23:52.314			Cfd78sXnDfbBNlqQlBqlron5dIHxcchS
tK2vcdFsYeQEScZ9s8MDhCjc3dbH96uT	2025-02-04 08:23:52.314	hBbFXNcTkzaveKcMOU8O4Sejcm4gbtFZ	2025-01-28 08:23:52.314	2025-01-28 08:23:52.314			087nQlbR28jfXO0fNVnaPEKjN31xdlCc
xPuh4Yjs8edGR8ykx1aEoUg581ABL8Uw	2025-02-04 08:23:52.314	09VZypoIAY4FkKcnDfEHEMU16eh4PMeL	2025-01-28 08:23:52.314	2025-01-28 08:23:52.314			DvFtHWmERhE8m0CYI0QPDVeat3RBfbFK
rul3DnTB1YhAiA8HNd0qygkEc2GatPSk	2025-02-04 08:23:52.315	C6Vj7WjdIiWXZAqLcCgJg0DJC7P89vqW	2025-01-28 08:23:52.315	2025-01-28 08:23:52.315			Dhy44kjBkH3Rc20lUBDyYXw7Qkonfoe4
n03d17nLskvRQX5ogKMhkUOWfxUsdKXM	2025-02-04 08:23:52.315	jN8JTgXA6tfISzAedwzFNvUls4bNsggc	2025-01-28 08:23:52.315	2025-01-28 08:23:52.315			5h9qX2mspqeRiuRxwcaOs2mEABh8pscA
n3F36CCukKcIklIQqqBpVoz8jxZbs73F	2025-02-04 08:23:52.315	bgMMTc2ZUfUfJ2rHyi5lUYVGjzS4fLrx	2025-01-28 08:23:52.315	2025-01-28 08:23:52.315			bVfgqrsZic98sjQDSbLOmwRxcRnUhnqc
qs8UZFEXetMml9vu4oPvd6qpSriwvUFh	2025-02-04 08:23:52.316	nkIpHXcDhXRsNTLwilHcsJjzaPOG3igM	2025-01-28 08:23:52.316	2025-01-28 08:23:52.316			YGBi0YHlK6Ojnc6EQMJZYWTiQk2x6lwZ
A4TKUynWjppwsvNZoklNGLjlcLyCP1LY	2025-02-04 08:23:52.316	jLp78F1ShaBeWQkg0a0nSzaBZP8eJHVL	2025-01-28 08:23:52.316	2025-01-28 08:23:52.316			cVfHrbgAdaMz9GHD4h2SZpIMa09ix9cG
inFxsFE9i19oPDhwSiubdbiwydCwYBs8	2025-02-04 08:23:52.316	eITaEevDW5AG4Qwq7GVCSGrbTQ5KYkej	2025-01-28 08:23:52.316	2025-01-28 08:23:52.316			tLAbkwObt25vrdyvRzt4RdXfy03EqU2y
Vmnapq2bHPPqQOLL0VPgvkQaPKl9j0x1	2025-02-04 08:23:52.317	V4pvI9JJb8ftdbHSU99INgUqWPHYBQby	2025-01-28 08:23:52.317	2025-01-28 08:23:52.317			hQpGDiZj9baB0M67IqeM0R5GRxLmf2yl
APNCbaWJX0R78YICnPMqc7x30KE0gjLR	2025-02-04 08:23:52.317	Y2YTQSa5ojc3kYkY6lIY0ABjGbRY2dAn	2025-01-28 08:23:52.317	2025-01-28 08:23:52.317			d7Qm5YNpfrCbEhWBYvd9d2SfmXWnNaP8
bsS8gN3f4D4DtAOXCtxDoabuHloEcTmV	2025-02-04 08:23:52.317	WPQkiiVTQaaHXeMUDcLbcwkj70dC4xNQ	2025-01-28 08:23:52.317	2025-01-28 08:23:52.317			OcJsu6FEhwZAu5BmmzGCUwfafrbjxLsb
pnZ90gdY6WI2QZhLMjTVYCcz3AyG85gh	2025-02-04 08:23:52.318	2fhQxEgKhDnUsYG6S7W6Jy1HeG749M4D	2025-01-28 08:23:52.318	2025-01-28 08:23:52.318			a8JjLmlGYb54xoW7dPdDeXHAKF0bnjQp
PohwGa734GMzc1hJWJHphd6ZZPmQtk0o	2025-02-04 08:23:52.321	ZOQ6p38d0JsxNveMWKdEMuGEGxN0Vajc	2025-01-28 08:23:52.321	2025-01-28 08:23:52.321			9PphWHeQYahz3kwPwkfxXoR0WgjkUJwK
gEOU97SCtfuUU7gdSPemKehQX8Lnyz9c	2025-02-04 08:23:52.324	UAzg39NrqnD7XWTj0RvhTFegoBsGayre	2025-01-28 08:23:52.324	2025-01-28 08:23:52.324			aCCfRysppPz4eAda5gqzM1C2eQ6tJeYZ
rCiO5lrupT3IIG2GeHwWq27TgDWy7uw1	2025-02-04 08:23:52.328	m0xFHnpa9UTYWo6tDCvSSd1TrP32bEMX	2025-01-28 08:23:52.328	2025-01-28 08:23:52.328			UHchoEpdBp0oWbfxGsuwyiZriorernxQ
fZPFEr69RF2ySb3xfVdb7LC2XGrWfQ48	2025-02-04 08:23:52.33	zHbMuMBbffa1vPlUjQTQhsedCtUxehF9	2025-01-28 08:23:52.33	2025-01-28 08:23:52.33			PCvpdwbqfDiD5v92asIOC0swhNisfk63
uBJzjvMuWJHIxgf8m9KkKKeL5yYqRmHt	2025-02-04 08:23:52.332	7JwF01NEOqGENpJ6W7EFKfiDiWWjMJ1w	2025-01-28 08:23:52.332	2025-01-28 08:23:52.332			1fuowmTo5pin0u10j5kqGUzEB8LJ49wD
io2m50h2pRfxs5UZgMOkrBgfnBi5WhUK	2025-02-04 08:23:52.334	b4mgPQ43SaOWPC8I4x7UJw8nMYzVTIFg	2025-01-28 08:23:52.334	2025-01-28 08:23:52.334			z3VSg0JhiQPQKymcfjvN1vmfrIQkDPsc
rbQvyuUC0oKzxoEqosn5pHYI0RQggTyD	2025-02-04 08:23:52.336	qCh3PgkF5IQmYIZTHUGkMf4Cancr1ZWo	2025-01-28 08:23:52.336	2025-01-28 08:23:52.336			b22tQKj0haB7hg2EpJibgS7wg6PBkuYm
mSI4R2ouN6GWYid2XaXw65TC703VxmPL	2025-02-04 08:23:52.338	k5g4ccxToFPrgEXhY8drGmpi22UTEgtp	2025-01-28 08:23:52.338	2025-01-28 08:23:52.338			GAAvrhfX6mxfj8TBSZW0L5a03cNgvVP5
IAkOkEFbhR0TMLKCnig8HavnMnbNEqAH	2025-02-04 08:23:52.341	nLHWmo64UNpNhHXkmsn7cNrSbtaqy6Ab	2025-01-28 08:23:52.341	2025-01-28 08:23:52.341			Mww2jtnJ3eQZZPLczdvLSPAI4rdGfY4r
Aj1UdpYwb8y3PCPMxs4DbPazYg7YwpHl	2025-02-04 08:23:52.347	VKrRyfHQyeFgDfo1QkZcpe9pdRrVhpoC	2025-01-28 08:23:52.347	2025-01-28 08:23:52.347			eAw8xqJTMWYLzkuxQMgAnpdJ7xhKvBsG
gJb5hpk8AkPsChT2oXlb98xUKWyXG36H	2025-02-04 08:23:52.349	ZawEFqoxoy2m2bhkBTyhJVYLXDU0aXP8	2025-01-28 08:23:52.349	2025-01-28 08:23:52.349			ekHXYtwXC1evA2FnLXQfbuxGfP4wR5Sm
28WgJS26ew7KBv4dthA1hZMTzeVcwmjR	2025-02-04 08:23:52.351	rYB9AZARSyQtNLnpBnUjfjXGx5L6QNUd	2025-01-28 08:23:52.351	2025-01-28 08:23:52.351			tfTDYHXK7QAbJHDYvt5yIK9ys4cqiCG3
9DJ4uW5XPHRsagRshm67WdFQPrYsWVud	2025-02-04 08:23:52.353	Bv1rbp9o4bdXBBX9Tr626TfepS1rPWzV	2025-01-28 08:23:52.353	2025-01-28 08:23:52.353			EpBgg4xEErcx0cX3exJEizOa146fijVP
j6AN3iFfhbutLlohkdp2w8ekWJ8Rad5K	2025-02-04 08:23:52.356	AwZL7X0ITdhm8uJakHk7SMemgdkSKSKl	2025-01-28 08:23:52.357	2025-01-28 08:23:52.357			v8UFvvZ6j4SdeQOmBIgFZuwr34ECPv6L
UrH4LuF0lz7r5nmhSf11qbzylOQ1SRH6	2025-02-04 08:23:52.359	cWixf7SMevcdn4DaWbgh4Vi4oeOe4eeV	2025-01-28 08:23:52.359	2025-01-28 08:23:52.359			KXYTGocImjisFroteIcT6ERheQ9uJk2k
zefTF9RQMyEHpZMp2D6gJ0BbgaRlcz6i	2025-02-04 08:23:52.362	c3Dr2Cm18V5oAi47q2D6irTNSZSb3wUs	2025-01-28 08:23:52.362	2025-01-28 08:23:52.362			TrBlWR6tsenY4uZOpqKiZJxKGjs0cEod
5WPujGGI2UdpL3Exm4NGaq0DSuLD0umD	2025-02-04 08:23:52.364	V64sWZI3hBTaSIGdUfYIv6oOSh7KM5Hu	2025-01-28 08:23:52.364	2025-01-28 08:23:52.364			DmlefAwHV89Rh1SVeBJsQDsgbIWf2Qxy
ceW4bMmj1gyZLxUtJeCfeuaXEbp0i1EA	2025-02-04 08:23:52.366	2b57ZCHQXwd4VzHFfbZ616H59rPvStqy	2025-01-28 08:23:52.366	2025-01-28 08:23:52.366			UNSHGrpU2p1jt8qh9TxS57qwKxP8ySL9
U1QbsgeBv1Alotzge1mMWx4hhNMggQfn	2025-02-04 08:23:52.369	VEd0GHR9jq7tfkf935f7NJNTi0E53lXB	2025-01-28 08:23:52.369	2025-01-28 08:23:52.369			0smdeCPG8fN25YkCLSEE3Cc5SLDzbSsa
0xujtjABTjBYQuZgKuHtR8GrbOkGvF1v	2025-02-04 08:23:52.318	eYAIrmyjjbE062Nh9jeFdqstcezQ6DDN	2025-01-28 08:23:52.318	2025-01-28 08:23:52.318			nEPOzc8Q6mRDKJiygQVXNuCVD62SVSol
XUbjhiKlXkG6dmXnCchi8XkdWdkGhdDg	2025-02-04 08:23:52.321	Vgakg6FudNKZmahB4Pasq67bDrxtKR7x	2025-01-28 08:23:52.321	2025-01-28 08:23:52.321			y83yPrsUhYHjHTRtpT5Qfrlbg1Sr07sp
hJcUPVmFWaJQ0KjkqMTfchxOdfuMyVRA	2025-02-04 08:23:52.325	6KpkgpcOtfqZhecLxvI1AMKUA8fr8ZVZ	2025-01-28 08:23:52.325	2025-01-28 08:23:52.325			BnhgPmzf2AjyxCautMUVgEX1SxDmO4gb
DjH7nWIOtz6lYsK0sKnH0pmAug4JIbqx	2025-02-04 08:23:52.328	8mPb9NKkEcVcVHpOM2U0KlVgjDxHZ0P6	2025-01-28 08:23:52.328	2025-01-28 08:23:52.328			CQRDiOV8a5GfIocpwmnVNrBv9Rx6VS9K
30xXxPdVmFmhvI4TJN1nqoZIeJd35lUa	2025-02-04 08:23:52.33	xkcZYqSZQFmL7MFtJw6sTg6MQDYfzRMG	2025-01-28 08:23:52.33	2025-01-28 08:23:52.33			73AM9XAgdblvcx3euEN7yMhFOhIJNRQB
2n0iwtZ0TbbuRJVdvc7zV2hcDjjIkSVB	2025-02-04 08:23:52.333	BCUvOuSqdokijJHZjicwrhGtDQhZBWWc	2025-01-28 08:23:52.333	2025-01-28 08:23:52.333			oK4RilzEmvw7jrLj1TS3qNZymeto73pB
uJvr5gEnwpW3SxzmFgNM8CbLvZBdX2QR	2025-02-04 08:23:52.334	riViPYFfTziYXfhXkGZRzeRQsqlVQ4Vz	2025-01-28 08:23:52.334	2025-01-28 08:23:52.334			UhHtU240C1MSBPhJ7bIyfLHSybpf25de
GgnwktT1XrL7JFv9voIjmKhG2upGROQo	2025-02-04 08:23:52.336	2LkOMHhZ64yaIusKAkCMSy3L3IgOr1WG	2025-01-28 08:23:52.336	2025-01-28 08:23:52.336			MqzARMkQyTGdNRrPMOjvwsGussg5fzY2
ozecwYuUIDE5efMn17dBXf2UgmkASK34	2025-02-04 08:23:52.339	yXwbu7qj4sdguU76tQPTx7W74enDIFVh	2025-01-28 08:23:52.339	2025-01-28 08:23:52.339			qpUX34oCzjdWSFrlAnap94sZX9m6vapA
G6ojmdKLD5IKsKon6Yau7twfOpwJgqyB	2025-02-04 08:23:52.341	CjZqI8Ol0rferzD3r9akglWJ8Hzh1lcz	2025-01-28 08:23:52.341	2025-01-28 08:23:52.341			svKvrVnGzixHcZKhMXGwM9wpM9C0TJu6
QVdhKEaKjydfveyBp3QROIdhojtg6Pfn	2025-02-04 08:23:52.347	KFZHsSqfQxeVcJaS02qvkJEkiectfEhA	2025-01-28 08:23:52.347	2025-01-28 08:23:52.347			9Ff1P8bz8HLjYqKd84cde9ZflyOVcH6Z
z82S7lvJjxBhihw8alw1pBDnEfSZwiDv	2025-02-04 08:23:52.349	bDwT5TXLUAKtLkfcTpHb0eoWpRHlKYLe	2025-01-28 08:23:52.349	2025-01-28 08:23:52.349			PCRSxZWfuYbAKxrWFVgWgJfNdOUPCr5v
bUJnlM4MkN9MW26wUQmGrwPEX7Qnj0p7	2025-02-04 08:23:52.351	yaCtMI6EUI6Yk6aMvrlyb9eSZ4c4x0As	2025-01-28 08:23:52.351	2025-01-28 08:23:52.351			TWwNrMaA6ceVi0pwG3jY4rjOHqQriKMr
MWtaZq34H6NaJXZ8POqkcCjYx1jPYLuC	2025-02-04 08:23:52.353	wgLazpvcbqqBadmWcKaXe53fC0fm5gfP	2025-01-28 08:23:52.353	2025-01-28 08:23:52.353			idKbjNUHcuQozZ72edKTpfpPYpmmc62I
DXJ7CEMlFh6bC3wMgMUKV4RIeCuBjJ9h	2025-02-04 08:23:52.357	pw4YYwoXCedvozBt257hTysA2A6R3XFV	2025-01-28 08:23:52.357	2025-01-28 08:23:52.357			x1PPZF9VhX2XGBRTISO7KYuZZHfEuiOj
WDw2eEIbuGhduIVTYUkOtU4nJ9FPovJu	2025-02-04 08:23:52.36	B4MbesPaKdBxxmi8RuMpMNxFr7c3RHMi	2025-01-28 08:23:52.36	2025-01-28 08:23:52.36			6GaFgKndlIwCdN8w4kawcPGTcJYznW1w
3mEyRxjdOARTC40h3Lb0w4j0c3aR3ZNf	2025-02-04 08:23:52.363	hKNeb5gLpef62zT4tq6OlBQBpslx4zSX	2025-01-28 08:23:52.363	2025-01-28 08:23:52.363			GaCwSsYolbDwpcI68II06Ml8lkYQuJDe
7rAEdekLv9BYyJExCMFtV5AG6vo8XbxA	2025-02-04 08:23:52.365	bx8cH7GKcFnaGhpd8FwyrSjzO7Bi8j1q	2025-01-28 08:23:52.365	2025-01-28 08:23:52.365			KxtI6Qwpsf6iL10e78HSpgroVyweNK9n
Zfj9XRTF3KD0O1FWvlLRbxeI4iuzr1WC	2025-02-04 08:23:52.367	gJ7lPvPZeWFPqUHBazeqofEXxIHPcP1v	2025-01-28 08:23:52.367	2025-01-28 08:23:52.367			aV8V8XWAnnFfyzRZhdBTMKSYy1ohAIz7
m3EgxmumdylXheNdgr2QxCrDhsYU7I2Y	2025-02-04 08:23:52.369	NCdtQHCaaAvNbgKGOGfOHcIaabhIPtxO	2025-01-28 08:23:52.369	2025-01-28 08:23:52.369			mBLWI8WmD2qcpAxtTrFh7fDGTR6gtRaq
tOBIIBMp4zjUVDDfCjSLb1ibEH6LeebP	2025-02-04 08:23:52.318	FV2nmJRxERxdOHoTOPXHce4BDWL5Y9Qj	2025-01-28 08:23:52.318	2025-01-28 08:23:52.318			3yBpsDz2G7ssxFHSQtdqd7JIEWSBONnx
itvhW0bTmF6igzw07i2EyOjnmJgdCV2l	2025-02-04 08:23:52.321	BVCuuhtTqOXb1N43NssFD4JyoGVXtmWp	2025-01-28 08:23:52.321	2025-01-28 08:23:52.321			7uuufi7iwmMTGoIImNu0HeLntAQPBFdT
K7AeNKaxyQdTReXyrEv7i2XC6yjPYqpG	2025-02-04 08:23:52.325	iNUvTott1h8X3Rz5orWSxHPqyOPKdks2	2025-01-28 08:23:52.325	2025-01-28 08:23:52.325			AMDw3AUhg9eMv3lB3qkUdgRZyIprFvQl
Ktv0DnDtkgjQKgLfwwZhNVM2eCH0Jh0n	2025-02-04 08:23:52.329	k8KaxtP1IzIhs7145ezk7zukKI7NgBAa	2025-01-28 08:23:52.329	2025-01-28 08:23:52.329			Lk2P4Vc16kegKlDRqlORrpPa2LONw7pe
fiQpaXraekFfPnh5N4NOfRxvPTazcvLJ	2025-02-04 08:23:52.33	MemJX9kxz7cPKLBLWrckgqVltIsAbls9	2025-01-28 08:23:52.33	2025-01-28 08:23:52.33			GdQuiC00jiTON9hEd9yNZsdUvlobvDRH
fg3d06thdOtBC2pogyzcXCcT69Ygem3R	2025-02-04 08:23:52.333	qZetVG0RSVs4uFiRBDfkLIrS29SAf2eY	2025-01-28 08:23:52.333	2025-01-28 08:23:52.333			RkCgU1glcxMBPZNQHa6YnTEPETLe5Taq
UYQ6nlRYgNxc7zAemOWvgZ6Y2rDTpZpH	2025-02-04 08:23:52.335	AIl5UEHtoREGXw8ZkRj3KnMNkSmq7OSE	2025-01-28 08:23:52.335	2025-01-28 08:23:52.335			1Mfe83pgAzuKE5xmqJL6Dh5VqXcQ8jUn
h9BzbMbcducEr4erNDH5VvD6w4nhVSqp	2025-02-04 08:23:52.337	frVctQByV6C7zzVU784mZ3SGCBjbZyO5	2025-01-28 08:23:52.337	2025-01-28 08:23:52.337			bcjl8qsHc9RjzaWeDPfNL7GsXg8ATci6
RORavlAJGZGyyDzL4TrEN2BXviHw7YLH	2025-02-04 08:23:52.345	nVaACqW07ncmIqk7i0dXk5yhbpZWXhAg	2025-01-28 08:23:52.345	2025-01-28 08:23:52.345			eleJHsaoJli4DIsVY6ztb2B3cqZY4erH
wx023LAWxfnR9BWTKiAaoPY5hyHDC0Zg	2025-02-04 08:23:52.35	c6WIi1YC1zemp383p4raoid9mVAwDDCb	2025-01-28 08:23:52.35	2025-01-28 08:23:52.35			ZSWGG53QN4Cpk4IRLJ1RwuYvCzCzn7eV
C8YafrG9DvbKvg4WoCKl1vuX7xDfIjTs	2025-02-04 08:23:52.354	m0AOPHsFBiv76ZCOX30LP9AztRF65TCY	2025-01-28 08:23:52.354	2025-01-28 08:23:52.354			g8mnyabQhC2qhNUbhGMwO8ZvXXV7UriD
EGFCEALruB1ovdECr6jatk26a3woEnYQ	2025-02-04 08:23:52.361	XHYwX8bUDhhtlL3ih1bnLeFd1LkaAuQj	2025-01-28 08:23:52.361	2025-01-28 08:23:52.361			WHYHf6QUnvoXjwBeIOOz64cRnNic8HpC
ISZprPfVwi9zUMJiLUPnDh5BDm4ws7Lt	2025-02-04 08:23:52.366	MBVB1jb6BrWqzNcNSTjXpOcQrPzERcBh	2025-01-28 08:23:52.366	2025-01-28 08:23:52.366			P7OjXFmnZFVN8QRtMb93fH5ie3pkzvPU
GsofUayc0cQiysnZ1FozQQgGTLXR7gJR	2025-02-04 08:23:52.319	A3bsKBrl9ijptgAAeja842vgrLRDrSUX	2025-01-28 08:23:52.319	2025-01-28 08:23:52.319			BkA8h99uJ58MV1RXaiCnhuF1FIoaYoaL
ERdmfhr8sfrI2U5c8Xkm0SBiXr52q7W6	2025-02-04 08:23:52.326	c2D7yGVtCleYihfEVfgYlWcpD5QajBF1	2025-01-28 08:23:52.326	2025-01-28 08:23:52.326			xjzxrgKXKYVKY1oO1M4bkhGhijjVUpkt
cUK7Cucxf8NLMPRPg8Q87o0BgxviF6c5	2025-02-04 08:23:52.331	EBsVGLkY80CcU6UcO0HtUk3hrob5Gdh9	2025-01-28 08:23:52.331	2025-01-28 08:23:52.331			cV1FaCDfY1PREjteB19Xw4VpfrBfZe0h
w1of3F4aljU8382XQAansKIQwIV6bMgz	2025-02-04 08:23:52.336	nLwbQFMxUHuukJd6s36WZU7R7Eehjqzg	2025-01-28 08:23:52.336	2025-01-28 08:23:52.336			7Nai32SEtgUN5XtjbCW5BsXrQDN4Nw6X
Lq5RKLORn4ckdvky7CSLqDm2IuqZ0W9n	2025-02-04 08:23:52.34	khnhgavcagKxviguLLpTCtFPnicqh1V1	2025-01-28 08:23:52.34	2025-01-28 08:23:52.34			k9rA5CDG8IKKF1Poi9rVMe2iJwt8XzH3
TWrBrFbcDhg2w90RJhfpy6T8ND5lkYhE	2025-02-04 08:23:52.348	ssWnTqg9NaTAKPN1kQ6h9VonkQsVtUXW	2025-01-28 08:23:52.348	2025-01-28 08:23:52.348			cJpJt2N2voNSZ9FsBn0dpnAZHbwD2Q0Z
Qm82G9JC1ro0R3mJmXEM2CBuBZhxkZUQ	2025-02-04 08:23:52.353	NTc4tAd2zXPB8LumW5tRoFwUQUFvdSw9	2025-01-28 08:23:52.353	2025-01-28 08:23:52.353			Zeu4N6qzahQI49n5aiw2gSypRQO3KnLS
GlHdpflmXMozt5DT3olLLMo3eXWthHAR	2025-02-04 08:23:52.359	oBPao0pk7eSA2zsZbfYZN2U87yX853sD	2025-01-28 08:23:52.359	2025-01-28 08:23:52.359			lmeDwjNujgrZlyhBhhyQCDZFeky0dsPd
PRUXxPteZvcoyJB8Dj6pKXWDqbAGygGF	2025-02-04 08:23:52.364	lc3cCFcZAN3hpPKFgDfDeTWqXZHY36od	2025-01-28 08:23:52.364	2025-01-28 08:23:52.364			ez3LvpZtw3YlYKBZS5G29bKC9aGeThsc
yidpFhOpF29yFhhZTkOi7aHOxW84XEzu	2025-02-04 08:23:52.368	VhWhxXFjxm5ZM5uMyT45auly19ecbgqg	2025-01-28 08:23:52.368	2025-01-28 08:23:52.368			QNxZIWDhheUiCpNOfwJTPUa6hL4DgkqT
lHDw5hSke66vJam7IoNyvghtdhiWYDYl	2025-02-04 08:23:52.319	b6qvyeXR3DwsX4yGOMT15sSALYAXMwZC	2025-01-28 08:23:52.319	2025-01-28 08:23:52.319			SR43AAbYyXia3rL86ohGydsaPigd6j0S
Ch8HGrrWKd2u5I6kN3z3Uf6lmRAiBaVx	2025-02-04 08:23:52.327	3dEkElLhTx1WM7dsv61JMzl025bxJTTe	2025-01-28 08:23:52.327	2025-01-28 08:23:52.327			vLE2BT8bbOgrFnviovQLKo5KgGcFBdI3
iGPITLK9TGfwiAjcx64bJKyFR7iVlPdt	2025-02-04 08:23:52.331	mR8Z2YRtbmk77mjtpvxpEJm9j05S0Kpw	2025-01-28 08:23:52.331	2025-01-28 08:23:52.331			dQArYtrlCmsskidnnvJEZn4uwlbh1q15
8ZYtAlFjeuVeJYNTSh3yZ61rO6uV0H0l	2025-02-04 08:23:52.335	rwBr81e6t5pdoDLEOcA6zAfcGkotYcqR	2025-01-28 08:23:52.335	2025-01-28 08:23:52.335			2AkQ0NZlRyDhZTrChrVPnpEwxRYmq0LB
DL9NmUXQA45FbfgX80Gg9y1bkDaJF8aK	2025-02-04 08:23:52.34	2s0bK5CKkFsb3NIwUvFYJmRFzzetw6Lr	2025-01-28 08:23:52.34	2025-01-28 08:23:52.34			txzt0C4Y9D7Ooe8dZpbvIRbThgXBbdIc
mp23fDvBIXHesehjyJaEc5FKbWdeDRhZ	2025-02-04 08:23:52.348	mqo1zlVbqNovCuBtQp8Ux8DfA8AXzlJL	2025-01-28 08:23:52.348	2025-01-28 08:23:52.348			gattRtud8aA7XZ8oJW6g7jg13cFYwmgK
BfZeEbpBSmcPjtjLeReQY73P5GpXCDAt	2025-02-04 08:23:52.352	mgaM34ATIXrKEqthBI34LaRhdz1XoAtZ	2025-01-28 08:23:52.352	2025-01-28 08:23:52.352			DlLUJRz30VpcIfJVGOJC8FjecoEVPTrI
7K9I4z5YChotUv9MJJacmzmuQcbkdmcL	2025-02-04 08:23:52.354	EpdecpZ8ZHzOgxGZkLENRMuqHbEdJGmd	2025-01-28 08:23:52.354	2025-01-28 08:23:52.354			8BXD1HC8CF66qVIkZCxuDnC8iOKC4FQc
D7UpBG19aSDGDGdUWXhP9bKNvG94dHyw	2025-02-04 08:23:52.357	mJ2uysLYBd6RQ52Ch8DPxaSJqhgPduNy	2025-01-28 08:23:52.357	2025-01-28 08:23:52.357			tmL1aVXjFAXseELscfdPoOdCBN2qsttJ
cbhkstjnDEHrncl59T5ZMZK4GdPBbm3L	2025-02-04 08:23:52.363	Oi3IplNLCNX5qqzDdarkt73fcmoVDKdP	2025-01-28 08:23:52.363	2025-01-28 08:23:52.363			U63HaDNhT2SgNb8bzqu9oX0FDmCephtJ
aWGxsBRZkU1fKZDvXKcxcMqoSaVhSCM4	2025-02-04 08:23:52.367	ZqMNUhHSCg8a0ynSZfuIYnelhaC3agZF	2025-01-28 08:23:52.367	2025-01-28 08:23:52.367			5dfLs3DGEGvvBQq27q3pfpvlw3UC0H5S
uzoZHYqSucg4VIsLLNCnPzdCfkYdUb6j	2025-02-04 08:23:52.32	OGZVJCwf2mbKQIomJqO1TytxRnYxhK30	2025-01-28 08:23:52.32	2025-01-28 08:23:52.32			q1r6DLlcjoEte14NgrtUImRBZrbfBaEB
oxaiSN5s4i8s9AqMHHw8YG9jPooRHq3A	2025-02-04 08:23:52.327	t6THJprOJmxqHotXFFrgX5Gt9PdmUyij	2025-01-28 08:23:52.327	2025-01-28 08:23:52.327			hp52XOMicxLuZCcn7Syzo1jbP7JcIKud
rdtBTqL4Igl8aB6ieIviTren6tTMrzci	2025-02-04 08:23:52.332	c1ODTocdAVTqLKAtggykkIWVVMKgzfNy	2025-01-28 08:23:52.332	2025-01-28 08:23:52.332			wqFMxecXBdDGXkJboa3NXNHvaZ4tliOg
X6z2jzMDPSW2JQpUcvskeUDymlprqddH	2025-02-04 08:23:52.335	ktDcGWoTIp2ZBQxXR9bMvtZuzfDxn0PW	2025-01-28 08:23:52.335	2025-01-28 08:23:52.335			jr64DbzEmVx7irWFNcfytk2JxwcLy4FD
EhDTBNysLbQZB3LqMD24kaILPxzIXhsG	2025-02-04 08:23:52.34	cxcj13HEBMWuBRm0tcEzgJ8HOyuhhJFu	2025-01-28 08:23:52.34	2025-01-28 08:23:52.34			tmn976ya6z0TZOcGA18iiqxkmy41ZTy0
PgUbOxvqF0PIcJQ1orBBnEHr4CuRv0Dg	2025-02-04 08:23:52.349	fLHvgIuPkoALCMJwWybuMou244cl56Mm	2025-01-28 08:23:52.349	2025-01-28 08:23:52.349			Pliz1HpHbTS1OfVopDjh2poAjGRAU2kN
cp1zPhsufUZQLMJlUN06AwLfpN8Kaag8	2025-02-04 08:23:52.352	IWhAc9iyUtqpR7C8QDhQwhqi6yY5xZzy	2025-01-28 08:23:52.352	2025-01-28 08:23:52.352			YzTLtIPgH8qtAbLsqyHxQtcgmWbWiqDB
rWiCCvErShsp07aZK8bmCZgPPewaps52	2025-02-04 08:23:52.358	vO2Xp0CbHg1hXje5ZmVdFfBvgna69mae	2025-01-28 08:23:52.358	2025-01-28 08:23:52.358			aPZfuCiyQgT06CnYbEvLQFv1uUDwLMaY
TrNhR3nmG1zxuL3jR5ETfpvbmTfegVcr	2025-02-04 08:23:52.363	yLl33ZdlRaJncq7i9xlMmarEWaQlBaqV	2025-01-28 08:23:52.363	2025-01-28 08:23:52.363			EMmeXoLAyezcYz13ZBddNnTR5TREo8mj
8iGu7SH4fbDtF0quhdW3O9SdgWM2Tbyc	2025-02-04 08:23:52.368	DKVRIRJQvvXMDd2aG0UM4iIs9g5JZNDb	2025-01-28 08:23:52.368	2025-01-28 08:23:52.368			WimNihdhAghkbQA3QcKu1nlmhE2bYzMT
mzTc6dfnuOaKdBcFi5lgm7oWpucyVDjv	2025-02-04 08:23:52.32	nFhCUHIlOJrTDzuMvELpPgG2JKvt3aDa	2025-01-28 08:23:52.32	2025-01-28 08:23:52.32			WifEm814GIjer5GKL4kYD5NBlVfkHxT7
KeFElqhFYgVkqtdCfRiXODW8LNEwUgat	2025-02-04 08:23:52.328	OSVvFabvZtz3tNcXgWYROXXU2qDhFFam	2025-01-28 08:23:52.328	2025-01-28 08:23:52.328			vV3eg3x3UZ2HAfNY06SdQoZsBAG0CPRV
AS6K8PAb5Vlv7G23uFHPAb3TyW0zoVrm	2025-02-04 08:23:52.332	otzqVK688mrqforlxXU4SWoRgnOa9BuO	2025-01-28 08:23:52.332	2025-01-28 08:23:52.332			Na4PetRe2mFO8XQt4pnur4IJenr2hWeW
3IGlXH6vZFel7Ncfeh9JPOsqkmNbOHGz	2025-02-04 08:23:52.336	4wD2NdvPfT9DkfwDsGg749DXXup0IsRl	2025-01-28 08:23:52.336	2025-01-28 08:23:52.336			4xROIGwXWjy4bq2jOyC6OPjPTosEb3dc
4RllZVMTNab0RafCIujmQdmX3g1smppe	2025-02-04 08:23:52.341	hyUy8eGehnaXpdvTsvRjwpA8LoIP5Gnk	2025-01-28 08:23:52.341	2025-01-28 08:23:52.341			siYrg43ghmez42BKYeixakiVjTxM6zc2
h9xme7ho8sTFibHMlatmH1Kjns8N6k7d	2025-02-04 08:23:52.348	vFiqBnHPIZHoOQRZOz9DfJvAHwxiSh1i	2025-01-28 08:23:52.348	2025-01-28 08:23:52.348			hrRn5Gi1FW2NjSgGdHxnn0kCc00mNuHR
JpdtfZP3vDwyFQ3kDOUFlO6ornQunlMo	2025-02-04 08:23:52.352	Lc4O8ExNzaysfxeBD40fcwqqMhkvFtnI	2025-01-28 08:23:52.352	2025-01-28 08:23:52.352			ttm9qPE1gK4qBTC3SHDFDBg1TDnC5qYd
ZAVxuHwg0eOHKtPGOOpUn758wkampeSs	2025-02-04 08:23:52.358	71brtFvxdVwCCi4A929axUY3ogvghv1c	2025-01-28 08:23:52.358	2025-01-28 08:23:52.358			NJuhjFgqaVL6riXKk5VuDwNMmug2QUWk
gKRPOxOfQb9JA3slIN2y5yazwMgeLqnY	2025-02-04 08:23:52.364	8oZakaeUcFnUhCyqpbC2a1nGYHvcWUlC	2025-01-28 08:23:52.364	2025-01-28 08:23:52.364			3m65OryIv0GEmOgI9ucXh14BmTQuyqz3
8WjpHQoaJy1iFzeK7aVe17D2jJkMaMNw	2025-02-04 08:23:52.368	W2N6NEQBUXPUise1aZBV4ATu3CsKi1pw	2025-01-28 08:23:52.368	2025-01-28 08:23:52.368			cULBl5qIqFeZGuOletNraYid6mjgXncm
kJqEyPjbpZUGfPniTIfTgaLhqwaTKMJP	2025-02-04 08:23:52.322	GH9bMsjqTJy3A8YhRm94nlcKjFeCmpDg	2025-01-28 08:23:52.322	2025-01-28 08:23:52.322			9K7cBMnrtkHBZJXaeiJkZymjAAJj3oiM
yqP4g1PPUQ4x4rGNyPdpwOQzRw7SlMc2	2025-02-04 08:23:52.329	JlHMN0iIJ9YCVzr4heZqib7nei0HSNH0	2025-01-28 08:23:52.329	2025-01-28 08:23:52.329			lEjfcqVHnkNJfaLuxhuf4rEPTX6CV8hf
nJTdOE1ViyTaegV9tsSq4miPIbMt1UuK	2025-02-04 08:23:52.331	uZAokc9cPgoS0NSfeLUHkGCsMl59lwuW	2025-01-28 08:23:52.331	2025-01-28 08:23:52.331			f0mOJ6XtFqCrLBQn4ZND4lUShBu7t5dA
jc8eXzDpb4vf55mLvy3ExZwVdpceBCkM	2025-02-04 08:23:52.333	gevsvseeDpRwqhzPlRYEAaVreeIW0A3E	2025-01-28 08:23:52.333	2025-01-28 08:23:52.333			qPkHcjrcCGPCTL45b5WkD1gsajMgPzgO
VrC6pBEumG0ppnTcZTM8EdVS6Nhyyrwr	2025-02-04 08:23:52.337	uA0YJiE6J14RWVErhFL3U01vpgmPVvRU	2025-01-28 08:23:52.337	2025-01-28 08:23:52.337			R9Hu6q8b1WfKLxJrVZSSmyvkE70O6OJZ
kHjPuqGeaFHydVjuNpXaRScQ0IoCWZfU	2025-02-04 08:23:52.347	hikbss9xrKKhS8OAXgch41GFn4iSVb4x	2025-01-28 08:23:52.347	2025-01-28 08:23:52.347			pglNk8hBxfAUXnpwuijZU2ef59W5TDYu
oFjQjiaZZ8rrWU1mgpv8FLi4e8GdhWiB	2025-02-04 08:23:52.351	oTTUjaf4apeJZef5xc84hZiwkLB3IUIX	2025-01-28 08:23:52.351	2025-01-28 08:23:52.351			uxF2zUOzZ9OiMCijKA2RH9UyL9iSSnAQ
MKuCqnmnq3Nz2HVXGEbl0r5EZPsem9Ds	2025-02-04 08:23:52.355	gntGOfCgw0HJA57AtwT83QKXsP7JRgdE	2025-01-28 08:23:52.355	2025-01-28 08:23:52.355			cW3uygZSmbEfFYzuyFADnmhdzbCdTrJa
uduNj6hzOjpWMxxxCBP9byujSbVeWQGF	2025-02-04 08:23:52.362	uHIvd2CO9MP8HX0ccVW43Gxt7oUqYRGD	2025-01-28 08:23:52.362	2025-01-28 08:23:52.362			UNY80zBf1uMNnd4ETcagzqdxblInJmxY
MCiovp4ZWGonR4ouJrsK4znywK191FQE	2025-02-04 08:23:52.366	JfXoiYaBtOdGOjye3kFz8pLD8onslcvy	2025-01-28 08:23:52.366	2025-01-28 08:23:52.366			VySeTjjn44qRBP1hm7NjkKPCRWTEWcMy
a3jknjdDIgZhQuNDPz67gB0rlainKeum	2025-02-04 08:23:52.323	5VGhHb4hPSTI2Wr4gBKF1MMpqrTlhuZn	2025-01-28 08:23:52.323	2025-01-28 08:23:52.323			Ou5utFsUn3tuJtsYpeqGnReBcEWfbtVx
7ZcXIVK1oaCwaEuo2ZeFYOID4q8ImDZh	2025-02-04 08:23:52.329	MPIEipgvJL8bZsOM66WJo8G1jd48d4Ej	2025-01-28 08:23:52.329	2025-01-28 08:23:52.329			695HxVaeRRi4GZShnFmzlEMJrzByB30a
Mz0c3UGegMxF9cb8B38WZBhecLMFr2Ok	2025-02-04 08:23:52.333	39QcZ1seHZNXZEqtShrtVq7t2k063Ppi	2025-01-28 08:23:52.334	2025-01-28 08:23:52.334			6RJrxxVZ2Nv1K62PdEOwoHqNRWOkWh61
hLxLHG2O3qmgKyJfqyP7EQ1N1i4jcFuk	2025-02-04 08:23:52.337	c0d3BmR5izsvhkgCnG4giK9HoRMpuuP5	2025-01-28 08:23:52.337	2025-01-28 08:23:52.337			2GyufSGsJB9JeUo5nDqyqQTkCCre6Jhv
pemS6XIF5D8GaeTXl3T1bISlVNHlfhwj	2025-02-04 08:23:52.346	IVxk2oXeucBAuB8R4kMVglhDDmxiq5qK	2025-01-28 08:23:52.346	2025-01-28 08:23:52.346			C81ooibC5STVSn62VzFbDlBeMgn5kH78
rokn8WVoCiA22x28R7ofiQMcYlEi8VuC	2025-02-04 08:23:52.35	BsisfPIa0LCAOlcuJMlVXzSJdYstWAaF	2025-01-28 08:23:52.35	2025-01-28 08:23:52.35			DCW1F5DJd8IywmYmXEhpWwuD1sWmsSV8
CdDdmQTVxzaTXw0o59Yg5oCCJiCy8hHg	2025-02-04 08:23:52.355	Oh0WdNH1slmd5XZ5qEdW8q53fDhOzDOC	2025-01-28 08:23:52.355	2025-01-28 08:23:52.355			XfGOM9NHYztK8o14jLvdM7gPFO4ECucn
s8dKFsggDx32kz0Akwv6FOvbTJgXxto3	2025-02-04 08:23:52.362	OGQChqTrMpvqr9J9yYjGbxYE87c84wu5	2025-01-28 08:23:52.362	2025-01-28 08:23:52.362			lpTuvRiZIzrWTVbf4qEOnTK6fh08J8Id
uoNzij7aU3IVXK2SJqip2h7f3TkZnxPT	2025-02-04 08:23:52.365	exnK4ivFwFxV4tvAFSCaTOWJaVWQh3kR	2025-01-28 08:23:52.365	2025-01-28 08:23:52.365			Kci2lQHqdhaFnhAT1DOx59R1uap3BTqK
g8U3Ly9aeETLYYCMhjL9T1BuHASkh3aR	2025-02-04 08:23:52.324	gM7iGoF87fwUYnlSwxsmhwfvdevAgult	2025-01-28 08:23:52.324	2025-01-28 08:23:52.324			9jUNfaHoa0kH7F5QtFuqtSZaS8vrb7e5
sSKHURDbqe0tv8pBQ6m7QARfrSAM3qcl	2025-02-04 08:23:52.33	PceTehs1pgczTfV3AZ2dCz3kSyhhUQ5O	2025-01-28 08:23:52.33	2025-01-28 08:23:52.33			CUVNyLWxoGnxBCnJH6xsIbSj8CREa7gc
kquQYLjtmC1rexuiKQJafrlvQAdnLHOH	2025-02-04 08:23:52.334	ALcuApGugR9DE6dQftshvBfU2U8Ifb41	2025-01-28 08:23:52.334	2025-01-28 08:23:52.334			okQQ5URqyaoTdtU8Bqx4cJEjeVYwNlpB
AUzcKtC8T1YOSHzgOtP4tmCK1MmedJTq	2025-02-04 08:23:52.338	x8C3MQyE8d0f0MoxoAzoL3DSxeE5owXv	2025-01-28 08:23:52.338	2025-01-28 08:23:52.338			XvjXHnydaWOsVdTYH7WMeNQ2uGeyq0oH
D4qxgURkmnfksqWWcFNtdLDtoPTkhg8Z	2025-02-04 08:23:52.346	fQDnVWbJn6H23UrnJ1eMvA5qxiWX3uZT	2025-01-28 08:23:52.346	2025-01-28 08:23:52.346			wMgH9N3jufdVmOg7G8nRy8KuVbXZ2FVZ
oPk0kVNG1gGgmcS8f8YGPVM51ZhUpNCO	2025-02-04 08:23:52.35	DiftNBVhZf0tsw8iceGEx2wwwf9cVPrK	2025-01-28 08:23:52.35	2025-01-28 08:23:52.35			aeutdMCiPGivvRoAEvhfQowEe8g3NCYi
yPec1fDv93g1HcKieNHhiCaGmEVZlPQj	2025-02-04 08:23:52.354	LQF0EYFaw4mifH7PzFBh1JbbpHBboW1W	2025-01-28 08:23:52.354	2025-01-28 08:23:52.354			IkKBIfG3ix2NtLbNQlcJ7aalDgSPaGNn
WSmoNXZ0aiBry5gcblFu4RahLHzt4QiJ	2025-02-04 08:23:52.361	2x4qzYdG82wzlkdWSfxtoIalKIB6bjEb	2025-01-28 08:23:52.361	2025-01-28 08:23:52.361			NKbJhAs9mRCWgS4jnX7qVxaUuIHQg1De
BczbQlJhU0NnngAYqbfgdw5jkZJaLi5y	2025-02-04 08:23:52.365	gVkQXR7S9IGxwaH9s504J2i8h4YofZya	2025-01-28 08:23:52.365	2025-01-28 08:23:52.365			0f7EjCfsEPdFgpYsmgema2nSq2dk2FEs
2vUu4eRfTo7VmAN8jklZ6P8PjC6MK3ky	2025-02-04 08:24:26.739	BAoKbNcGKNXvAd5dCVwwzjPXLuysCxzS	2025-01-28 08:24:26.739	2025-01-28 08:24:26.739	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36	svKvrVnGzixHcZKhMXGwM9wpM9C0TJu6
\.


--
-- Data for Name: sub_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.sub_categories (id, category_id, name, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: support_types; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.support_types (id, name, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: team_assignments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.team_assignments (id, user_id, created_at, updated_at, team_id) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.teams (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tickets (id, requestor_id, category_id, sub_category_id, support_type_id, details, created_at, updated_at, assigned_id, status, assessment, action, cancelled_due_to, started_at, resolved_at, cancelled_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, email, email_verified, image, created_at, updated_at, role, office_id, department_id, division_id, "position") FROM stdin;
aB5YCt2pHi0uakHQ8SrVuUxMFvFlWODe	Francisco R. Alolod, Jr., CPA, CESE	franciscoalolod@gscwd.com	f	\N	2025-01-28 08:20:49.889	2025-01-28 08:20:49.889	user	ltaropdfvglqjwlhnmumiumznuli	\N	\N	Assistant General Manager
Sfcf52QLeJWY4QbZsF9xMtB2GcXYkWmf	Sharon C. Gadayan, MPA	sharongadayan@gscwd.com	f	\N	2025-01-28 08:20:49.891	2025-01-28 08:20:49.891	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	\N	Department Manager A
ZkZGxPjDI7W4BR9urJ2wHj5Mzc4KVunN	Maria Celia N. Dandan, CE	mariaceliadandan@gscwd.com	f	\N	2025-01-28 08:20:49.894	2025-01-28 08:20:49.894	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	\N	Department Manager A
GxagVwlU0m28JJWwJgbG5PnClyvnBtIU	Jia Jane F. Cornelio	cornelioturija@gscwd.com	f	\N	2025-01-28 08:20:49.899	2025-01-28 08:20:49.899	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	\N	Clerk Processor C
DaeACknxGUH6NusRguwhLLuu2d5QUbQY	Cornelio T. Turija, CE	jiajanecornelio@gscwd.com	f	\N	2025-01-28 08:20:49.904	2025-01-28 08:20:49.904	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	\N	Department Manager A
MVPoXGOG442vJVwGnjg0Us1z6nLaZ2ZS	Andrew R. Tinoy	andrewtinoy@gscwd.com	f	\N	2025-01-28 08:20:49.907	2025-01-28 08:20:49.907	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Clerk Processor B
ADQhInRcAxyUTruOLypvLbdSPh3GPEoa	Ulysis N. Alcoriza, CPA	ulysisalcoriza@gscwd.com	f	\N	2025-01-28 08:20:49.912	2025-01-28 08:20:49.912	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Senior Financial Planning Specialist
WNSuxNPgv9llyVX5lP62iDGP7W90y6M0	Anita G. Villena	anitavillena@gscwd.com	f	\N	2025-01-28 08:20:49.92	2025-01-28 08:20:49.92	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Senior Accounting Processor A
ncnoO0s18rKRlrEYJ4FbcR02qFjkMvkr	April Christianne M. Caban	aprilchristiannecaban@gscwd.com	f	\N	2025-01-28 08:20:49.921	2025-01-28 08:20:49.921	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Senior Accounting Processor A
SavV7FLpQulzIVUqFjWFS0BKuAEqNcIo	Rona Mari A. Castillo	ronamaricastillo@gscwd.com	f	\N	2025-01-28 08:20:49.922	2025-01-28 08:20:49.922	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Senior Accounting Processor B
AlGhfhRtdMh1bqmXrEYj1Qm2DtE0vsId	Gladys Faith T. Lebosada	gladysfaithlebosada@gscwd.com	f	\N	2025-01-28 08:20:49.923	2025-01-28 08:20:49.923	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Accounting Processor A
5xu9mwV7eHvbloEua5avHStG0jKu2Ggg	Aileen F. Arim, LPT	aileenfavila@gscwd.com	f	\N	2025-01-28 08:20:49.924	2025-01-28 08:20:49.924	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Senior Accounting Processor B
Bun2586jHvNmdw1AWNCCrVrdgj8UzJAn	Shiela M. Balancar	shielabalancar@gscwd.com	f	\N	2025-01-28 08:20:49.925	2025-01-28 08:20:49.925	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Clerk Processor C
U5o7KCBc1XjF1h75tq4CMgxNHeabHzuL	Sheila Mae F. Reyes, CPA	sheilamaereyes@gscwd.com	f	\N	2025-01-28 08:20:49.926	2025-01-28 08:20:49.926	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	hfzczgbmhkiykslttutrfinryqos	Chief Corporate Accountant B
fhzA9xqcvSmYPGki0cy6xhU4vF1RaMlf	Jed G. Cuervo	jedcuervo@gscwd.com	f	\N	2025-01-28 08:20:49.93	2025-01-28 08:20:49.93	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Clerk Processor C
dgzQMss9eafQYuoK9X3q0mPj4zwcsAib	Sheena Jean C. Lim	sheenajeanlim@gscwd.com	f	\N	2025-01-28 08:20:49.933	2025-01-28 08:20:49.933	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Clerk Processor C
UnIOIOn4ck24q7wkxX7obf6bgBpW97Pi	Julincris M. Ucat, MBA	julincrisucat@gscwd.com	f	\N	2025-01-28 08:20:49.935	2025-01-28 08:20:49.935	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	\N	Department Manager A
JQGHfwjFZN8Nf3PZws5TCq4JVhQHIner	Liza S. Alair	lizaalair@gscwd.com	f	\N	2025-01-28 08:20:49.935	2025-01-28 08:20:49.935	user	rmmdpirqnschcsgtlzmvjcauhate	\N	\N	Executive Assistant B
CRhXIMQMZl7ZYbHCX0aMpVrOF46bCCJa	Vanessa Jane L. Yabes	vanessajanelim@gscwd.com	f	\N	2025-01-28 08:20:49.936	2025-01-28 08:20:49.936	user	rmmdpirqnschcsgtlzmvjcauhate	\N	\N	Clerk Processor B
fCmXblAhcAnr4FdBUn6wslr45MR6YVdj	Kris Andrea F. Habla	krisandreahabla@gscwd.com	f	\N	2025-01-28 08:20:49.936	2025-01-28 08:20:49.936	user	ltaropdfvglqjwlhnmumiumznuli	\N	\N	Clerk Processor C
MwoRXohC6PgmKyKIw2gDZKXY7O6LHU88	Alyssa May G. Cajilig	alyssamaycajilig@gscwd.com	f	\N	2025-01-28 08:20:49.937	2025-01-28 08:20:49.937	user	mmaepuqalyxqstnwealtpbzrplhy	\N	\N	Clerk Processor C
dhy2mU2H94u99xBuqB6E1wKTd8wVOVEp	Ferdinand S. Ferrer, MPA	ferdinandferrer@gscwd.com	f	\N	2025-01-28 08:20:49.937	2025-01-28 08:20:49.937	user	zeltsnmgzbbnywxgqdxiucthdiws	\N	\N	Assistant General Manager
EOGLfXnjhMHTEBK3WcgLUwcDFuRToOY1	Maritess P. Primaylon, MPA	maritessprimaylon@gscwd.com	f	\N	2025-01-28 08:20:49.937	2025-01-28 08:20:49.937	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Division Manager A
UHj4LFwwwHkRgOs2dKcDNXJZDANU9u1L	Hanelle B. Balansag, MPA	hanellebalansag@gscwd.com	f	\N	2025-01-28 08:20:49.938	2025-01-28 08:20:49.938	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	\N	Department Manager A
afxLwTkcZVVJj1Nu2On6RoGaUA4hahKD	Maria Cher Lorelie T. Hsu	mariacherloreliehsu@gscwd.com	f	\N	2025-01-28 08:20:49.938	2025-01-28 08:20:49.938	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Cashier A
OTPHgciwLUYG1EhgT7Wp8Pq91nPXCdC3	Maricel T. Rogan, LPT	maricelrogan@gscwd.com	f	\N	2025-01-28 08:20:49.938	2025-01-28 08:20:49.938	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Cashier B
Eo1gaLjeZSNREzuw2h4I7TGir39geajS	Felnor G. Latorre	felnorgencianos@gscwd.com	f	\N	2025-01-28 08:20:49.939	2025-01-28 08:20:49.939	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Cashier C
3lNZl9TtBMguIjdbDN4d7VwBXJLz62sF	Julius C. Latorre	juliuslatorre@gscwd.com	f	\N	2025-01-28 08:20:49.939	2025-01-28 08:20:49.939	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Cashier D
vSdhgocZuLrNPFg8v3J6K6DXHymwH4t4	Marites G. Pelobillo	maritespelobillo@gscwd.com	f	\N	2025-01-28 08:20:49.94	2025-01-28 08:20:49.94	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Cashiering Services Chief A
BIVaPos98Z98kdYUkBzuSLwVi4qIS8kh	Meliton M. Young	melitonyoung@gscwd.com	f	\N	2025-01-28 08:20:49.94	2025-01-28 08:20:49.94	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Corporate Budget Specialist B
zCwu4CPP3dKWMQeys7bOVCa4d5hHXxbg	Jeremias A. Reyes, MPA	jeremiasreyes@gscwd.com	f	\N	2025-01-28 08:20:49.94	2025-01-28 08:20:49.94	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	\N	Department Manager A
abd4v6wBfYniQLo2FdnQpG09SVhiqm3f	Mabelle V. Miyazoe	mabellemiyazoe@gscwd.com	f	\N	2025-01-28 08:20:49.941	2025-01-28 08:20:49.941	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Corporate Budget Assistant
GiHghnLHmIL1Ba85FEJRnVCcncrpkX4l	Anggelica R. Barte	anggelicabarte@gscwd.com	f	\N	2025-01-28 08:20:49.941	2025-01-28 08:20:49.941	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Cashiering Assistant
YSTg5AEvBGrQyAWLditxSK1O9bHVC0Nq	Jan Nicole K. Rellon	jannicolerellon@gscwd.com	f	\N	2025-01-28 08:20:49.942	2025-01-28 08:20:49.942	user	ltaropdfvglqjwlhnmumiumznuli	watlwovawipmrowahzulrwryrgqj	dgijbrptgrjeinbuxrjovufllhox	Clerk Processor C
DvFtHWmERhE8m0CYI0QPDVeat3RBfbFK	Mary Grace C. Egido	marygraceegido@gscwd.com	f	\N	2025-01-28 08:20:49.942	2025-01-28 08:20:49.942	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Supervising Industrial Relations Development Officer A
3yBpsDz2G7ssxFHSQtdqd7JIEWSBONnx	Haniel O. Decrepito	hanieldecrepito@gscwd.com	f	\N	2025-01-28 08:20:49.951	2025-01-28 08:20:49.951	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ufyuybznquqrvauleyovgsljcsvm	Administration Services Assistant A
BkA8h99uJ58MV1RXaiCnhuF1FIoaYoaL	Mira Jean F. Papa	mirajeanpapa@gscwd.com	f	\N	2025-01-28 08:20:49.955	2025-01-28 08:20:49.955	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Procurement Assistant B
Dhy44kjBkH3Rc20lUBDyYXw7Qkonfoe4	Charlene Marie D. Pe	charlenemariepe@gscwd.com	f	\N	2025-01-28 08:20:49.942	2025-01-28 08:20:49.942	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Administration Services Assistant A
OcJsu6FEhwZAu5BmmzGCUwfafrbjxLsb	Wilhem R. Aquino	wilhemaquino@gscwd.com	f	\N	2025-01-28 08:20:49.951	2025-01-28 08:20:49.951	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ufyuybznquqrvauleyovgsljcsvm	Clerk Processor B
Ou5utFsUn3tuJtsYpeqGnReBcEWfbtVx	Kevin J. Ante	kevinante@gscwd.com	f	\N	2025-01-28 08:20:49.956	2025-01-28 08:20:49.956	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Clerk Processor B
Cfd78sXnDfbBNlqQlBqlron5dIHxcchS	Lipsy Grace C. Lucas	lipsygracelucas@gscwd.com	f	\N	2025-01-28 08:20:49.943	2025-01-28 08:20:49.943	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Administration Services Assistant C
a8JjLmlGYb54xoW7dPdDeXHAKF0bnjQp	Agnes P. Tampico, MPA	agnestampico@gscwd.com	f	\N	2025-01-28 08:20:49.952	2025-01-28 08:20:49.952	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Division Manager A
9K7cBMnrtkHBZJXaeiJkZymjAAJj3oiM	Jason Roy T. Ferolino	jasonroyferolino@gscwd.com	f	\N	2025-01-28 08:20:49.956	2025-01-28 08:20:49.956	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Clerk Processor B
087nQlbR28jfXO0fNVnaPEKjN31xdlCc	Christine B. Tacuban, MPA	christinetacuban@gscwd.com	f	\N	2025-01-28 08:20:49.943	2025-01-28 08:20:49.943	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Supervising Industrial Relations Development Officer A
nEPOzc8Q6mRDKJiygQVXNuCVD62SVSol	Stephen D. Ardales, MPA	stephenardales@gscwd.com	f	\N	2025-01-28 08:20:49.952	2025-01-28 08:20:49.952	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Supervising Industrial Relations Development Officer A
9jUNfaHoa0kH7F5QtFuqtSZaS8vrb7e5	Cherry May B. Rapisora	cherrymayrapisora@gscwd.com	f	\N	2025-01-28 08:20:49.956	2025-01-28 08:20:49.956	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Clerk Processor B
bVfgqrsZic98sjQDSbLOmwRxcRnUhnqc	Chez Anne D. Sampani	chezannedolor@gscwd.com	f	\N	2025-01-28 08:20:49.943	2025-01-28 08:20:49.943	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Administration Services Assistant A
d7Qm5YNpfrCbEhWBYvd9d2SfmXWnNaP8	Rauline Kaye A. Antopina	raulinekayeautida@gscwd.com	f	\N	2025-01-28 08:20:49.953	2025-01-28 08:20:49.953	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Administration Services Assistant A
aCCfRysppPz4eAda5gqzM1C2eQ6tJeYZ	Albert S. Masamayor	albertmasamayor@gscwd.com	f	\N	2025-01-28 08:20:49.957	2025-01-28 08:20:49.957	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Clerk Processor C
YGBi0YHlK6Ojnc6EQMJZYWTiQk2x6lwZ	Angelica H. Tubiano	angelicatubiano@gscwd.com	f	\N	2025-01-28 08:20:49.944	2025-01-28 08:20:49.944	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Administration Services Assistant C
WifEm814GIjer5GKL4kYD5NBlVfkHxT7	Rogelio A. Besana, Jr., CE,RMP	rogeliobesanajr@gscwd.com	f	\N	2025-01-28 08:20:49.953	2025-01-28 08:20:49.953	user	mmaepuqalyxqstnwealtpbzrplhy	\N	\N	Assistant General Manager
7uuufi7iwmMTGoIImNu0HeLntAQPBFdT	Arturo C. Paalam	arturopaalam@gscwd.com	f	\N	2025-01-28 08:20:49.957	2025-01-28 08:20:49.957	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Administrative Services Aide
5h9qX2mspqeRiuRxwcaOs2mEABh8pscA	Kathleen Roma O. Pono	kathleenromapono@gscwd.com	f	\N	2025-01-28 08:20:49.945	2025-01-28 08:20:49.945	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Clerk Processor C
SR43AAbYyXia3rL86ohGydsaPigd6j0S	Cheeza Amor R. Diaz, LPT	cheezaamordiaz@gscwd.com	f	\N	2025-01-28 08:20:49.954	2025-01-28 08:20:49.954	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Administration Services Assistant C
tLAbkwObt25vrdyvRzt4RdXfy03EqU2y	Teresa Jane L. Tagayan	teresajanetagayan@gscwd.com	f	\N	2025-01-28 08:20:49.947	2025-01-28 08:20:49.947	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Clerk Processor C
q1r6DLlcjoEte14NgrtUImRBZrbfBaEB	Gesem R. Cabañero	gesemcabanero@gscwd.com	f	\N	2025-01-28 08:20:49.954	2025-01-28 08:20:49.954	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Supervising Material Planning Officer
cVfHrbgAdaMz9GHD4h2SZpIMa09ix9cG	Suzette D. Racelis	suzetteracelis@gscwd.com	f	\N	2025-01-28 08:20:49.949	2025-01-28 08:20:49.949	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ioqmkiwamtfoxsnhlxqnhlkwlrdk	Industrial Nurse
9PphWHeQYahz3kwPwkfxXoR0WgjkUJwK	Andrew H. Nadal, Jr.	andrewnadaljr@gscwd.com	f	\N	2025-01-28 08:20:49.954	2025-01-28 08:20:49.954	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Material Procurement Officer A
hQpGDiZj9baB0M67IqeM0R5GRxLmf2yl	Melanie Nudos, LPT	melanienudos@gscwd.com	f	\N	2025-01-28 08:20:49.95	2025-01-28 08:20:49.95	user	zeltsnmgzbbnywxgqdxiucthdiws	yjuhcssmcurrcggxaenyaeyfrrsz	ufyuybznquqrvauleyovgsljcsvm	Supervising Industrial Relations Development Officer A
y83yPrsUhYHjHTRtpT5Qfrlbg1Sr07sp	Jennica P. Anoche	jennicaanoche@gscwd.com	f	\N	2025-01-28 08:20:49.955	2025-01-28 08:20:49.955	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Storekeeper B
AMDw3AUhg9eMv3lB3qkUdgRZyIprFvQl	Arnold S. Niñalada	arnoldninalada@gscwd.com	f	\N	2025-01-28 08:20:49.958	2025-01-28 08:20:49.958	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	mgletrgpgzqmkdmmmdmrvekicgpo	Clerk Processor C
xjzxrgKXKYVKY1oO1M4bkhGhijjVUpkt	Risa A. Marces	risamarces@gscwd.com	f	\N	2025-01-28 08:20:49.958	2025-01-28 08:20:49.958	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Utility Worker
vV3eg3x3UZ2HAfNY06SdQoZsBAG0CPRV	Jerald Jay V. Juanillo	jeraldjayjuanillo@gscwd.com	f	\N	2025-01-28 08:20:49.959	2025-01-28 08:20:49.959	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Utility Worker
vLE2BT8bbOgrFnviovQLKo5KgGcFBdI3	Bonipher M. Balisacan	bonipherbalisacan@gscwd.com	f	\N	2025-01-28 08:20:49.959	2025-01-28 08:20:49.959	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Building Electrician A
hp52XOMicxLuZCcn7Syzo1jbP7JcIKud	Florido C. Bohol	floridobohol@gscwd.com	f	\N	2025-01-28 08:20:49.959	2025-01-28 08:20:49.959	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Administrative Services Aide
BnhgPmzf2AjyxCautMUVgEX1SxDmO4gb	Darwin Dave D. Sarsale, ME	darwindavesarsale@gscwd.com	f	\N	2025-01-28 08:20:49.96	2025-01-28 08:20:49.96	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Administration Services Assistant A
lEjfcqVHnkNJfaLuxhuf4rEPTX6CV8hf	Mary Ann Sandy D. Pinos, ME	maryannsandypinos@gscwd.com	f	\N	2025-01-28 08:20:49.96	2025-01-28 08:20:49.96	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Supervising Industrial Relations Development Officer A
Lk2P4Vc16kegKlDRqlORrpPa2LONw7pe	Darlene O. Borja	darleneborja@gscwd.com	f	\N	2025-01-28 08:20:49.96	2025-01-28 08:20:49.96	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Housekeeping Services Assistant
CUVNyLWxoGnxBCnJH6xsIbSj8CREa7gc	Joseph D. Borja	josephborja@gscwd.com	f	\N	2025-01-28 08:20:49.961	2025-01-28 08:20:49.961	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Precision Instrument Repair and Maintenance Services Chief
695HxVaeRRi4GZShnFmzlEMJrzByB30a	Jaymar V. Gagni	jaymargagni@gscwd.com	f	\N	2025-01-28 08:20:49.962	2025-01-28 08:20:49.962	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Instrument Technician A
UHchoEpdBp0oWbfxGsuwyiZriorernxQ	Ronald C. Piamonte	ronaldpiamonte@gscwd.com	f	\N	2025-01-28 08:20:49.964	2025-01-28 08:20:49.964	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Driver Mechanic A
CQRDiOV8a5GfIocpwmnVNrBv9Rx6VS9K	Romel S. Bernadas	romelbernadas@gscwd.com	f	\N	2025-01-28 08:20:49.965	2025-01-28 08:20:49.965	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Driver Mechanic B
73AM9XAgdblvcx3euEN7yMhFOhIJNRQB	Reynaldo R. Cabañas	reynaldocabanas@gscwd.com	f	\N	2025-01-28 08:20:49.967	2025-01-28 08:20:49.967	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Driver Mechanic B
GdQuiC00jiTON9hEd9yNZsdUvlobvDRH	Noel A. Alava	noelalava@gscwd.com	f	\N	2025-01-28 08:20:49.967	2025-01-28 08:20:49.967	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Plant Equipment Operator A
f0mOJ6XtFqCrLBQn4ZND4lUShBu7t5dA	Salvador S. Bangcori, Jr.	salvadorbangcorijr@gscwd.com	f	\N	2025-01-28 08:20:49.968	2025-01-28 08:20:49.968	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Plant Equipment Operator C
cV1FaCDfY1PREjteB19Xw4VpfrBfZe0h	Franz S. Tibayan	franztibayan@gscwd.com	f	\N	2025-01-28 08:20:49.968	2025-01-28 08:20:49.968	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Utility Worker
wqFMxecXBdDGXkJboa3NXNHvaZ4tliOg	Jaypee P. Salanap	jaypeesalanap@gscwd.com	f	\N	2025-01-28 08:20:49.969	2025-01-28 08:20:49.969	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Mechanic
dQArYtrlCmsskidnnvJEZn4uwlbh1q15	Vince Ceasar T. Niones	vincecaesarniones@gscwd.com	f	\N	2025-01-28 08:20:49.969	2025-01-28 08:20:49.969	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Administrative Services Aide
PCvpdwbqfDiD5v92asIOC0swhNisfk63	Jeffrey G. Saranillo	jeffreysaranillo@gscwd.com	f	\N	2025-01-28 08:20:49.97	2025-01-28 08:20:49.97	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Administrative Services Aide
Na4PetRe2mFO8XQt4pnur4IJenr2hWeW	Emmateresa C. Silva	emmateresasilva@gscwd.com	f	\N	2025-01-28 08:20:49.97	2025-01-28 08:20:49.97	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Administrative Services Aide
1fuowmTo5pin0u10j5kqGUzEB8LJ49wD	Carlos V. Unajan, Jr.	carlosunajanjr@gscwd.com	f	\N	2025-01-28 08:20:49.971	2025-01-28 08:20:49.971	user	zeltsnmgzbbnywxgqdxiucthdiws	ubrcucqtennvdfazhnzbyaltislz	dlqhuraucmahlgthsnltkitkcprt	Administrative Services Aide
oK4RilzEmvw7jrLj1TS3qNZymeto73pB	Vanne Thea G. Balboa, EnP	vannetheabalboa@gscwd.com	f	\N	2025-01-28 08:20:49.971	2025-01-28 08:20:49.971	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	tzulwlejwreutxlkknabsuumbdew	Senior Community Relations Officer
qPkHcjrcCGPCTL45b5WkD1gsajMgPzgO	Charlyn B. Panunciar, MBA	charlynpanunciar@gscwd.com	f	\N	2025-01-28 08:20:49.971	2025-01-28 08:20:49.971	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	tzulwlejwreutxlkknabsuumbdew	Community Relations Officer B
RkCgU1glcxMBPZNQHa6YnTEPETLe5Taq	Rica Mae O. Alima, CPA	ricamaealima@gscwd.com	f	\N	2025-01-28 08:20:49.972	2025-01-28 08:20:49.972	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	tzulwlejwreutxlkknabsuumbdew	Senior Corporate Planning Analyst
okQQ5URqyaoTdtU8Bqx4cJEjeVYwNlpB	Rani Mae L. Biboso, CPA	ranimaebiboso@gscwd.com	f	\N	2025-01-28 08:20:49.973	2025-01-28 08:20:49.973	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	tzulwlejwreutxlkknabsuumbdew	Corporate Planning Analyst B
6RJrxxVZ2Nv1K62PdEOwoHqNRWOkWh61	Dana Angela D. Magoncia	danaangelamagoncia@gscwd.com	f	\N	2025-01-28 08:20:49.973	2025-01-28 08:20:49.973	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	lhpvmqehnpghpzwieijisxueixlm	Clerk Processor C
z3VSg0JhiQPQKymcfjvN1vmfrIQkDPsc	Atty. Judy A. Lim-Pasman	judylimpasman@gscwd.com	f	\N	2025-01-28 08:20:49.973	2025-01-28 08:20:49.973	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	lhpvmqehnpghpzwieijisxueixlm	Senior Corporate Attorney
UhHtU240C1MSBPhJ7bIyfLHSybpf25de	Revie Gianne F. Tinio, CPA	reviegiannetinio@gscwd.com	f	\N	2025-01-28 08:20:49.974	2025-01-28 08:20:49.974	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	lhpvmqehnpghpzwieijisxueixlm	Supervising Internal Control Officer
jr64DbzEmVx7irWFNcfytk2JxwcLy4FD	Samcelle B. Valenzuela, MPA	samcellevalenzuela@gscwd.com	f	\N	2025-01-28 08:20:49.974	2025-01-28 08:20:49.974	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	qpqstfxyoqphahgvpjvzwfaurero	Division Manager A
2AkQ0NZlRyDhZTrChrVPnpEwxRYmq0LB	Herminia G. Pantorilla	herminiapantorilla@gscwd.com	f	\N	2025-01-28 08:20:49.982	2025-01-28 08:20:49.982	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	qpqstfxyoqphahgvpjvzwfaurero	Customer Service Officer A
txzt0C4Y9D7Ooe8dZpbvIRbThgXBbdIc	Catherine Mae P. Tomeldan, MPA	catherinemaetomeldan@gscwd.com	f	\N	2025-01-28 08:20:49.991	2025-01-28 08:20:49.991	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Assistant A
Mww2jtnJ3eQZZPLczdvLSPAI4rdGfY4r	Kier John D. Flores	kierjohnflores@gscwd.com	f	\N	2025-01-28 08:20:50.004	2025-01-28 08:20:50.004	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	System Administrator
DCW1F5DJd8IywmYmXEhpWwuD1sWmsSV8	Roland N. Bacayo	rolandbacayo@gscwd.com	f	\N	2025-01-28 08:20:50.012	2025-01-28 08:20:50.012	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Electronics Communication System Operator A
8BXD1HC8CF66qVIkZCxuDnC8iOKC4FQc	Titus T. Pandian	tituspandian@gscwd.com	f	\N	2025-01-28 08:20:50.025	2025-01-28 08:20:50.025	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Principal Draftsman B
NJuhjFgqaVL6riXKk5VuDwNMmug2QUWk	Dionard Y. Callo	dionardcallo@gscwd.com	f	\N	2025-01-28 08:20:50.037	2025-01-28 08:20:50.037	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Senior Water Maintenance Man A
UNY80zBf1uMNnd4ETcagzqdxblInJmxY	Darwin A. Olalisan	darwinolalisan@gscwd.com	f	\N	2025-01-28 08:20:50.047	2025-01-28 08:20:50.047	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Welder
UNSHGrpU2p1jt8qh9TxS57qwKxP8ySL9	Armando D. Joven, Jr.	armandojovenjr@gscwd.com	f	\N	2025-01-28 08:20:50.055	2025-01-28 08:20:50.055	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Senior Water Resources Facilities Operator A
1Mfe83pgAzuKE5xmqJL6Dh5VqXcQ8jUn	Ester D. Matilos	estermatilos@gscwd.com	f	\N	2025-01-28 08:20:49.984	2025-01-28 08:20:49.984	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	qpqstfxyoqphahgvpjvzwfaurero	Customer Service Assistant A
tmn976ya6z0TZOcGA18iiqxkmy41ZTy0	Donna Mae J. Datago	donnamaedatago@gscwd.com	f	\N	2025-01-28 08:20:49.992	2025-01-28 08:20:49.992	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Assistant B
svKvrVnGzixHcZKhMXGwM9wpM9C0TJu6	Eric C. Sison	ericsison@gscwd.com	f	\N	2025-01-28 08:20:50.005	2025-01-28 08:20:50.005	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Management Information System Researcher
aeutdMCiPGivvRoAEvhfQowEe8g3NCYi	Ricky C. Libertad	rickylibertad@gscwd.com	f	\N	2025-01-28 08:20:50.015	2025-01-28 08:20:50.015	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Survey Aide B
Zeu4N6qzahQI49n5aiw2gSypRQO3KnLS	Rey R. Añora	reyanora@gscwd.com	f	\N	2025-01-28 08:20:50.026	2025-01-28 08:20:50.026	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Senior Draftsman
NKbJhAs9mRCWgS4jnX7qVxaUuIHQg1De	Noel D. Sanchez	noelsanchez@gscwd.com	f	\N	2025-01-28 08:20:50.038	2025-01-28 08:20:50.038	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Senior Water Maintenance Man B
TrBlWR6tsenY4uZOpqKiZJxKGjs0cEod	Leopoldo A. Patumbon, jr	leopoldopatumbon@gscwd.com	f	\N	2025-01-28 08:20:50.05	2025-01-28 08:20:50.05	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Pump Operator
aV8V8XWAnnFfyzRZhdBTMKSYy1ohAIz7	James Lovence L. Galban	jameslovencegalban@gscwd.com	f	\N	2025-01-28 08:20:50.055	2025-01-28 08:20:50.055	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Water Resources Facilities Operator A
4xROIGwXWjy4bq2jOyC6OPjPTosEb3dc	Mark Joseph D. Dano	markjosephdano@gscwd.com	f	\N	2025-01-28 08:20:49.985	2025-01-28 08:20:49.985	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	qpqstfxyoqphahgvpjvzwfaurero	Customer Service Assistant B
qpUX34oCzjdWSFrlAnap94sZX9m6vapA	Fanny H. Grafia	fannygrafia@gscwd.com	f	\N	2025-01-28 08:20:49.992	2025-01-28 08:20:49.992	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Water Maintenance Man A
cJpJt2N2voNSZ9FsBn0dpnAZHbwD2Q0Z	Allyn Joseph C. Cubero	allynjosephcubero@gscwd.com	f	\N	2025-01-28 08:20:50.006	2025-01-28 08:20:50.006	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Management Information System Researcher
PCRSxZWfuYbAKxrWFVgWgJfNdOUPCr5v	Cara Jade C. Reyes, CE	carajadereyes@gscwd.com	f	\N	2025-01-28 08:20:50.017	2025-01-28 08:20:50.017	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Engineering Assistant B
idKbjNUHcuQozZ72edKTpfpPYpmmc62I	El Siegfred D. Alim	elsiegfredalim@gscwd.com	f	\N	2025-01-28 08:20:50.026	2025-01-28 08:20:50.026	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Principal Draftsman A
6GaFgKndlIwCdN8w4kawcPGTcJYznW1w	Andrian P. Castromayor	andriancastromayor@gscwd.com	f	\N	2025-01-28 08:20:50.039	2025-01-28 08:20:50.039	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Water Maintenance Man A
GaCwSsYolbDwpcI68II06Ml8lkYQuJDe	Divinah Grace D. Elnasin	divinahgraceelnasin@gscwd.com	f	\N	2025-01-28 08:20:50.051	2025-01-28 08:20:50.051	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Clerk Processor B
5dfLs3DGEGvvBQq27q3pfpvlw3UC0H5S	Jesirine C. Fegarido	jesirinefegarido@gscwd.com	f	\N	2025-01-28 08:20:50.056	2025-01-28 08:20:50.056	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Clerk Processor C
b22tQKj0haB7hg2EpJibgS7wg6PBkuYm	Jannene G. Ferolino	janneneferolino@gscwd.com	f	\N	2025-01-28 08:20:49.986	2025-01-28 08:20:49.986	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	qpqstfxyoqphahgvpjvzwfaurero	Customer Service Assistant B
k9rA5CDG8IKKF1Poi9rVMe2iJwt8XzH3	Norman D. Gencianos	normangencianos@gscwd.com	f	\N	2025-01-28 08:20:49.993	2025-01-28 08:20:49.993	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Water Maintenance Man C
Pliz1HpHbTS1OfVopDjh2poAjGRAU2kN	Jay Raymond L. Nosotros	jayraymondnosotros@gscwd.com	f	\N	2025-01-28 08:20:50.006	2025-01-28 08:20:50.006	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Management Information System Researcher
uxF2zUOzZ9OiMCijKA2RH9UyL9iSSnAQ	Michael G. Gabales, REE	michaelgabales@gscwd.com	f	\N	2025-01-28 08:20:50.018	2025-01-28 08:20:50.018	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Division Manager A
XfGOM9NHYztK8o14jLvdM7gPFO4ECucn	Danilo M. Horlador, Jr., CE	danilohorladorjr@gscwd.com	f	\N	2025-01-28 08:20:50.027	2025-01-28 08:20:50.027	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Project Planning and Development Officer A
x1PPZF9VhX2XGBRTISO7KYuZZHfEuiOj	John Rey M. Cawit	johnreycawit@gscwd.com	f	\N	2025-01-28 08:20:50.039	2025-01-28 08:20:50.039	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Supervising Industrial Relations Development Officer A
KxtI6Qwpsf6iL10e78HSpgroVyweNK9n	Edmund L. Badal, EE	edmundbadal@gscwd.com	f	\N	2025-01-28 08:20:50.052	2025-01-28 08:20:50.052	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Principal Engineer C
P7OjXFmnZFVN8QRtMb93fH5ie3pkzvPU	Shah C. Tahir	shahtahir@gscwd.com	f	\N	2025-01-28 08:20:50.057	2025-01-28 08:20:50.057	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Housekeeping Services Assistant
7Nai32SEtgUN5XtjbCW5BsXrQDN4Nw6X	Noly B. Biantan	nolybiantan@gscwd.com	f	\N	2025-01-28 08:20:49.987	2025-01-28 08:20:49.987	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Officer A
siYrg43ghmez42BKYeixakiVjTxM6zc2	Katherine E. Leyson	katherineleyson@gscwd.com	f	\N	2025-01-28 08:20:49.997	2025-01-28 08:20:49.997	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Clerk Processor C
hrRn5Gi1FW2NjSgGdHxnn0kCc00mNuHR	Deo N. Del Rosario	deodelrosario@gscwd.com	f	\N	2025-01-28 08:20:50.007	2025-01-28 08:20:50.007	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Supervising Data Encoder- Controller
tfTDYHXK7QAbJHDYvt5yIK9ys4cqiCG3	Kumier Lou B. Arancon, CE	kumierlouarancon@gscwd.com	f	\N	2025-01-28 08:20:50.019	2025-01-28 08:20:50.019	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Supervising Data Encoder-Controller
cW3uygZSmbEfFYzuyFADnmhdzbCdTrJa	John Kenneth B. Del Valle	johnkennethdelvalle@gscwd.com	f	\N	2025-01-28 08:20:50.03	2025-01-28 08:20:50.03	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Engineering Assistant
tmL1aVXjFAXseELscfdPoOdCBN2qsttJ	Cleo Mallyn C. Hongoy	cleomallynhongoy@gscwd.com	f	\N	2025-01-28 08:20:50.04	2025-01-28 08:20:50.04	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Engineering Assistant
0f7EjCfsEPdFgpYsmgema2nSq2dk2FEs	O'Price J. Nepomuceno, RMT	opricenepomuceno@gscwd.com	f	\N	2025-01-28 08:20:50.052	2025-01-28 08:20:50.052	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Medical Technologist III
QNxZIWDhheUiCpNOfwJTPUa6hL4DgkqT	Lordiano C. Lamata	lordianolamata@gscwd.com	f	\N	2025-01-28 08:20:50.057	2025-01-28 08:20:50.057	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	ofjnxkyobwzfjtnqorpdmlhiyvdn	Watershed Aide
bcjl8qsHc9RjzaWeDPfNL7GsXg8ATci6	Ferly V. De Juan	ferlydejuan@gscwd.com	f	\N	2025-01-28 08:20:49.987	2025-01-28 08:20:49.987	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Assistant A
GAAvrhfX6mxfj8TBSZW0L5a03cNgvVP5	John Henry S. Alfeche	johnhenryalfeche@gscwd.com	f	\N	2025-01-28 08:20:50	2025-01-28 08:20:50	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Data Encoder
ekHXYtwXC1evA2FnLXQfbuxGfP4wR5Sm	Elea Glen D. Lacerna	eleaglenlacerna@gscwd.com	f	\N	2025-01-28 08:20:50.008	2025-01-28 08:20:50.008	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Data Encoder
TWwNrMaA6ceVi0pwG3jY4rjOHqQriKMr	Rizza R. Baugbog, CE	rizzabaugbog@gscwd.com	f	\N	2025-01-28 08:20:50.02	2025-01-28 08:20:50.02	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Senior Engineer A
v8UFvvZ6j4SdeQOmBIgFZuwr34ECPv6L	Shaira Grace R. Dela Cruz	shairagracedelacruz@gscwd.com	f	\N	2025-01-28 08:20:50.033	2025-01-28 08:20:50.033	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Engineering Assistant
aPZfuCiyQgT06CnYbEvLQFv1uUDwLMaY	Calvin Frans Angelo N. Galla	calvinfransangelogalla@gscwd.com	f	\N	2025-01-28 08:20:50.041	2025-01-28 08:20:50.041	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	zpjhlrkethompvebfsemzgyvrvxo	Engineering Assistant B
Kci2lQHqdhaFnhAT1DOx59R1uap3BTqK	Ma. Rita B. Barrieses, RMT	maritabarrieses@gscwd.com	f	\N	2025-01-28 08:20:50.053	2025-01-28 08:20:50.053	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Quality Assurance Chief
cULBl5qIqFeZGuOletNraYid6mjgXncm	Mario L. Pelobillo, AE	mariopelobillo@gscwd.com	f	\N	2025-01-28 08:20:50.058	2025-01-28 08:20:50.058	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	ofjnxkyobwzfjtnqorpdmlhiyvdn	Watershed Management Chief
R9Hu6q8b1WfKLxJrVZSSmyvkE70O6OJZ	Norberto Alvin H. Brosoto	norbertoalvinbrosoto@gscwd.com	f	\N	2025-01-28 08:20:49.988	2025-01-28 08:20:49.988	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Assistant A
wMgH9N3jufdVmOg7G8nRy8KuVbXZ2FVZ	Alexis G. Aponesto	alexisaponesto@gscwd.com	f	\N	2025-01-28 08:20:50.001	2025-01-28 08:20:50.001	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Data Encoder
eAw8xqJTMWYLzkuxQMgAnpdJ7xhKvBsG	Jeric Lloyd Z. Magbanua	jericlloydmagbanua@gscwd.com	f	\N	2025-01-28 08:20:50.008	2025-01-28 08:20:50.008	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Web Developer
ttm9qPE1gK4qBTC3SHDFDBg1TDnC5qYd	Enriquito R. Carmona	enriquitocarmona@gscwd.com	f	\N	2025-01-28 08:20:50.021	2025-01-28 08:20:50.021	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Survey Aide A
g8mnyabQhC2qhNUbhGMwO8ZvXXV7UriD	Joner C. Guillero	jonerguillero@gscwd.com	f	\N	2025-01-28 08:20:50.034	2025-01-28 08:20:50.034	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Engineering Assistant
U63HaDNhT2SgNb8bzqu9oX0FDmCephtJ	Cindy Claire B. Rabang	cindyclairerabang@gscwd.com	f	\N	2025-01-28 08:20:50.041	2025-01-28 08:20:50.041	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	zpjhlrkethompvebfsemzgyvrvxo	Liaison Officer A
ez3LvpZtw3YlYKBZS5G29bKC9aGeThsc	Deocyth S. Bustamante	deocythbustamante@gscwd.com	f	\N	2025-01-28 08:20:50.053	2025-01-28 08:20:50.053	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Senior Laboratory Technician
WimNihdhAghkbQA3QcKu1nlmhE2bYzMT	Ergie D. Pabon	ergiepabon@gscwd.com	f	\N	2025-01-28 08:20:50.058	2025-01-28 08:20:50.058	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	ofjnxkyobwzfjtnqorpdmlhiyvdn	Watershed Forester
XvjXHnydaWOsVdTYH7WMeNQ2uGeyq0oH	Vivian L. Catalan	viviancatalan@gscwd.com	f	\N	2025-01-28 08:20:49.989	2025-01-28 08:20:49.989	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Assistant A
eleJHsaoJli4DIsVY6ztb2B3cqZY4erH	Mikhail Anthony M. Sebua	mikhailanthonysebua@gscwd.com	f	\N	2025-01-28 08:20:50.002	2025-01-28 08:20:50.002	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Data Encoder
9Ff1P8bz8HLjYqKd84cde9ZflyOVcH6Z	Aimee C. Rama	aimeerama@gscwd.com	f	\N	2025-01-28 08:20:50.009	2025-01-28 08:20:50.009	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Technical Writer
DlLUJRz30VpcIfJVGOJC8FjecoEVPTrI	Gefrey O. Dumangcas	gefreydumangcas@gscwd.com	f	\N	2025-01-28 08:20:50.022	2025-01-28 08:20:50.022	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Survey Aide A
IkKBIfG3ix2NtLbNQlcJ7aalDgSPaGNn	Kristine Mae Q. Romualdo	kristinemaeromualdo@gscwd.com	f	\N	2025-01-28 08:20:50.035	2025-01-28 08:20:50.035	user	mmaepuqalyxqstnwealtpbzrplhy	tozqaijlyshutotfjebiucqyfqkb	ldqqwbbqrhjqomiqaiqyxfltfcfn	Engineering Assistant
EMmeXoLAyezcYz13ZBddNnTR5TREo8mj	Glenn E. Niones	glennniones@gscwd.com	f	\N	2025-01-28 08:20:50.042	2025-01-28 08:20:50.042	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	zpjhlrkethompvebfsemzgyvrvxo	Water Maintenance Man B
3m65OryIv0GEmOgI9ucXh14BmTQuyqz3	Lorevin V. Evangelio, ME	lorevinevangelio@gscwd.com	f	\N	2025-01-28 08:20:50.054	2025-01-28 08:20:50.054	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Water Utilities Development Officer A
0smdeCPG8fN25YkCLSEE3Cc5SLDzbSsa	Keen Jade S. Asparin	keenjadeasparin@gscwd.com	f	\N	2025-01-28 08:20:50.059	2025-01-28 08:20:50.059	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	ofjnxkyobwzfjtnqorpdmlhiyvdn	Forestry Assistant A
2GyufSGsJB9JeUo5nDqyqQTkCCre6Jhv	Jennifer B. Manguramas	jennifermanguramas@gscwd.com	f	\N	2025-01-28 08:20:49.989	2025-01-28 08:20:49.989	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Officer A
pglNk8hBxfAUXnpwuijZU2ef59W5TDYu	Ricardo Vicente P. Narvaiza	ricardovicentenarvaiza@gscwd.com	f	\N	2025-01-28 08:20:50.003	2025-01-28 08:20:50.003	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Data Encoder
gattRtud8aA7XZ8oJW6g7jg13cFYwmgK	Ian Spencer E. Robleza	ianspencerrobleza@gscwd.com	f	\N	2025-01-28 08:20:50.01	2025-01-28 08:20:50.01	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Systems Analyst
YzTLtIPgH8qtAbLsqyHxQtcgmWbWiqDB	Alfred V. Perez	alfredperez@gscwd.com	f	\N	2025-01-28 08:20:50.023	2025-01-28 08:20:50.023	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Survey Aide B
KXYTGocImjisFroteIcT6ERheQ9uJk2k	Jade Y. De Juan, ME	jadedejuan@gscwd.com	f	\N	2025-01-28 08:20:50.036	2025-01-28 08:20:50.036	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Senior Instrument Technician
WHYHf6QUnvoXjwBeIOOz64cRnNic8HpC	Michael Caine G. Diano	michaelcainediano@gscwd.com	f	\N	2025-01-28 08:20:50.043	2025-01-28 08:20:50.043	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	zpjhlrkethompvebfsemzgyvrvxo	Welder
DmlefAwHV89Rh1SVeBJsQDsgbIWf2Qxy	Ariel B. Batoto	arielbatoto@gscwd.com	f	\N	2025-01-28 08:20:50.054	2025-01-28 08:20:50.054	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Senior Water Resources Facilities Technician
mBLWI8WmD2qcpAxtTrFh7fDGTR6gtRaq	Reinalyn G. Mamac	reinalynmamac@gscwd.com	f	\N	2025-01-28 08:20:50.059	2025-01-28 08:20:50.059	user	rmmdpirqnschcsgtlzmvjcauhate	ftsnedhegjgalhwjcejnfophcnoa	ofjnxkyobwzfjtnqorpdmlhiyvdn	Forestry Assistant B
MqzARMkQyTGdNRrPMOjvwsGussg5fzY2	Shayne Ann B. Lee	shayneannlee@gscwd.com	f	\N	2025-01-28 08:20:49.99	2025-01-28 08:20:49.99	user	ltaropdfvglqjwlhnmumiumznuli	rrvpwbuhvcsvdhpfzptzbqgnamsl	hznsduofvgtklpwnyhtfmeeijpoq	Customer Service Assistant B
C81ooibC5STVSn62VzFbDlBeMgn5kH78	Nico Jay A. Rola	nicojayrola@gscwd.com	f	\N	2025-01-28 08:20:50.003	2025-01-28 08:20:50.003	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Computer Maintenance Technician
ZSWGG53QN4Cpk4IRLJ1RwuYvCzCzn7eV	Phyll Patrick C. Fragata	phyllpatrickfragata@gscwd.com	f	\N	2025-01-28 08:20:50.01	2025-01-28 08:20:50.01	support	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	ugidjcqppbjtjxgariifmfarudip	Senior Office Equipment Technician B
EpBgg4xEErcx0cX3exJEizOa146fijVP	Javon Ian E. Sumcio	javoniansumcio@gscwd.com	f	\N	2025-01-28 08:20:50.024	2025-01-28 08:20:50.024	user	zeltsnmgzbbnywxgqdxiucthdiws	yrhrmiavyasangqyzqfrvngvwjcg	pdwzdjxrvxhunaunhxulyrwdkmhm	Survey Aide
lmeDwjNujgrZlyhBhhyQCDZFeky0dsPd	Carlo R. Campos, CE	carlocampos@gscwd.com	f	\N	2025-01-28 08:20:50.037	2025-01-28 08:20:50.037	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	suuehvxepxcuqjazzxgrthweryqf	Senior Instrument Technician
lpTuvRiZIzrWTVbf4qEOnTK6fh08J8Id	Ark Kirby Y. Hallarsis	arkkirbyhallarsis@gscwd.com	f	\N	2025-01-28 08:20:50.044	2025-01-28 08:20:50.044	user	mmaepuqalyxqstnwealtpbzrplhy	grosuwbzfbrxvhnzqysdfzqtbmvh	zpjhlrkethompvebfsemzgyvrvxo	Engineering Assistant
VySeTjjn44qRBP1hm7NjkKPCRWTEWcMy	Romulo N. Tayabas, Jr.	romulotayabasjr@gscwd.com	f	\N	2025-01-28 08:20:50.054	2025-01-28 08:20:50.054	user	mmaepuqalyxqstnwealtpbzrplhy	paszkkyesfppvbgtethzihkswbou	sfmjagkvhhiwhnhipljsahsmonep	Senior Water Resources Facilities Technician
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.verification (id, identifier, value, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: admin
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 22, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: admin
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: category_assignments category_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category_assignments
    ADD CONSTRAINT category_assignments_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: department department_name_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_name_unique UNIQUE (name);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: division division_name_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.division
    ADD CONSTRAINT division_name_unique UNIQUE (name);


--
-- Name: division division_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.division
    ADD CONSTRAINT division_pkey PRIMARY KEY (id);


--
-- Name: office office_name_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.office
    ADD CONSTRAINT office_name_unique UNIQUE (name);


--
-- Name: office office_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.office
    ADD CONSTRAINT office_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: session session_token_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_token_unique UNIQUE (token);


--
-- Name: sub_categories sub_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (id);


--
-- Name: support_types support_types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.support_types
    ADD CONSTRAINT support_types_pkey PRIMARY KEY (id);


--
-- Name: team_assignments team_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.team_assignments
    ADD CONSTRAINT team_assignments_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: account account_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: category_assignments category_assignments_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category_assignments
    ADD CONSTRAINT category_assignments_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: category_assignments category_assignments_team_id_teams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category_assignments
    ADD CONSTRAINT category_assignments_team_id_teams_id_fk FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: comments comments_ticket_id_tickets_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_ticket_id_tickets_id_fk FOREIGN KEY (ticket_id) REFERENCES public.tickets(id);


--
-- Name: comments comments_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: department department_office_id_office_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_office_id_office_id_fk FOREIGN KEY (office_id) REFERENCES public.office(id);


--
-- Name: division division_department_id_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.division
    ADD CONSTRAINT division_department_id_department_id_fk FOREIGN KEY (department_id) REFERENCES public.department(id);


--
-- Name: session session_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sub_categories sub_categories_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: team_assignments team_assignments_team_id_teams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.team_assignments
    ADD CONSTRAINT team_assignments_team_id_teams_id_fk FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: team_assignments team_assignments_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.team_assignments
    ADD CONSTRAINT team_assignments_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: tickets tickets_assigned_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_assigned_id_users_id_fk FOREIGN KEY (assigned_id) REFERENCES public.users(id);


--
-- Name: tickets tickets_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: tickets tickets_requestor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_requestor_id_users_id_fk FOREIGN KEY (requestor_id) REFERENCES public.users(id);


--
-- Name: tickets tickets_sub_category_id_sub_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_sub_category_id_sub_categories_id_fk FOREIGN KEY (sub_category_id) REFERENCES public.sub_categories(id);


--
-- Name: tickets tickets_support_type_id_support_types_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_support_type_id_support_types_id_fk FOREIGN KEY (support_type_id) REFERENCES public.support_types(id);


--
-- Name: users users_department_id_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_department_id_department_id_fk FOREIGN KEY (department_id) REFERENCES public.department(id);


--
-- Name: users users_division_id_division_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_division_id_division_id_fk FOREIGN KEY (division_id) REFERENCES public.division(id);


--
-- Name: users users_office_id_office_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_office_id_office_id_fk FOREIGN KEY (office_id) REFERENCES public.office(id);


--
-- PostgreSQL database dump complete
--

