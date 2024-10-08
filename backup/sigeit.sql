PGDMP                     	    {         
   udo_sigeit    15.4    15.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    19145 
   udo_sigeit    DATABASE     �   CREATE DATABASE udo_sigeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE udo_sigeit;
                postgres    false            �            1259    21818    career    TABLE     �  CREATE TABLE public.career (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    description character varying,
    logo character varying,
    abbreviation character varying NOT NULL,
    "departmentId" integer
);
    DROP TABLE public.career;
       public         heap    postgres    false            �            1259    21817    career_id_seq    SEQUENCE     �   CREATE SEQUENCE public.career_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.career_id_seq;
       public          postgres    false    217            �           0    0    career_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.career_id_seq OWNED BY public.career.id;
          public          postgres    false    216            �            1259    21835 	   classroom    TABLE     t  CREATE TABLE public.classroom (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    description character varying,
    type character varying NOT NULL
);
    DROP TABLE public.classroom;
       public         heap    postgres    false            �            1259    31021     classroom_departments_department    TABLE     �   CREATE TABLE public.classroom_departments_department (
    "classroomId" integer NOT NULL,
    "departmentId" integer NOT NULL
);
 4   DROP TABLE public.classroom_departments_department;
       public         heap    postgres    false            �            1259    21834    classroom_id_seq    SEQUENCE     �   CREATE SEQUENCE public.classroom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.classroom_id_seq;
       public          postgres    false    219            �           0    0    classroom_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.classroom_id_seq OWNED BY public.classroom.id;
          public          postgres    false    218            �            1259    21857    day    TABLE     S  CREATE TABLE public.day (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    abbreviation character varying NOT NULL
);
    DROP TABLE public.day;
       public         heap    postgres    false            �            1259    21856 
   day_id_seq    SEQUENCE     �   CREATE SEQUENCE public.day_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.day_id_seq;
       public          postgres    false    221            �           0    0 
   day_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.day_id_seq OWNED BY public.day.id;
          public          postgres    false    220            �            1259    31005 
   department    TABLE     �  CREATE TABLE public.department (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    description character varying,
    logo character varying,
    abbreviation character varying NOT NULL,
    "schoolId" integer
);
    DROP TABLE public.department;
       public         heap    postgres    false            �            1259    31004    department_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.department_id_seq;
       public          postgres    false    235            �           0    0    department_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;
          public          postgres    false    234            �            1259    31064    period    TABLE     h  CREATE TABLE public.period (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    description character varying,
    start timestamp without time zone NOT NULL,
    "end" timestamp without time zone NOT NULL,
    "startTime" character varying NOT NULL,
    "endTime" character varying NOT NULL,
    "interval" integer NOT NULL,
    duration integer NOT NULL,
    stage character varying NOT NULL
);
    DROP TABLE public.period;
       public         heap    postgres    false            �            1259    31063    period_id_seq    SEQUENCE     �   CREATE SEQUENCE public.period_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.period_id_seq;
       public          postgres    false    238            �           0    0    period_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.period_id_seq OWNED BY public.period.id;
          public          postgres    false    237            �            1259    21937    schedule    TABLE     �  CREATE TABLE public.schedule (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    start character varying NOT NULL,
    "end" character varying,
    "classroomId" integer,
    "dayId" integer,
    "sectionId" integer,
    "periodId" integer
);
    DROP TABLE public.schedule;
       public         heap    postgres    false            �            1259    21936    schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.schedule_id_seq;
       public          postgres    false    231            �           0    0    schedule_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;
          public          postgres    false    230            �            1259    21784    school    TABLE     �  CREATE TABLE public.school (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    description character varying,
    logo character varying,
    abbreviation character varying NOT NULL
);
    DROP TABLE public.school;
       public         heap    postgres    false            �            1259    21783    school_id_seq    SEQUENCE     �   CREATE SEQUENCE public.school_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.school_id_seq;
       public          postgres    false    215            �           0    0    school_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.school_id_seq OWNED BY public.school.id;
          public          postgres    false    214            �            1259    21924    section    TABLE     �  CREATE TABLE public.section (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying NOT NULL,
    capacity integer,
    "subjectId" integer,
    "periodId" integer,
    "teacherId" integer
);
    DROP TABLE public.section;
       public         heap    postgres    false            �            1259    21923    section_id_seq    SEQUENCE     �   CREATE SEQUENCE public.section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.section_id_seq;
       public          postgres    false    229            �           0    0    section_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.section_id_seq OWNED BY public.section.id;
          public          postgres    false    228            �            1259    21889    subject    TABLE       CREATE TABLE public.subject (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    code character varying NOT NULL,
    name character varying NOT NULL,
    credits integer NOT NULL,
    description character varying,
    hours integer NOT NULL,
    semester integer NOT NULL,
    "typeCurriculum" integer,
    "departmentId" integer
);
    DROP TABLE public.subject;
       public         heap    postgres    false            �            1259    21973    subject_career    TABLE     q   CREATE TABLE public.subject_career (
    "subjectId" integer NOT NULL,
    "subjectCarrerId" integer NOT NULL
);
 "   DROP TABLE public.subject_career;
       public         heap    postgres    false            �            1259    22137    subject_careers_career    TABLE     r   CREATE TABLE public.subject_careers_career (
    "subjectId" integer NOT NULL,
    "careerId" integer NOT NULL
);
 *   DROP TABLE public.subject_careers_career;
       public         heap    postgres    false            �            1259    21904    subject_carrer    TABLE     q   CREATE TABLE public.subject_carrer (
    id integer NOT NULL,
    "subjectId" integer,
    "careerId" integer
);
 "   DROP TABLE public.subject_carrer;
       public         heap    postgres    false            �            1259    21903    subject_carrer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subject_carrer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.subject_carrer_id_seq;
       public          postgres    false    225            �           0    0    subject_carrer_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.subject_carrer_id_seq OWNED BY public.subject_carrer.id;
          public          postgres    false    224            �            1259    21888    subject_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.subject_id_seq;
       public          postgres    false    223            �           0    0    subject_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.subject_id_seq OWNED BY public.subject.id;
          public          postgres    false    222            �            1259    21911    teacher    TABLE     �  CREATE TABLE public.teacher (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    email character varying,
    "departmentId" integer,
    "idDocument" character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying
);
    DROP TABLE public.teacher;
       public         heap    postgres    false            �            1259    21910    teacher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.teacher_id_seq;
       public          postgres    false    227            �           0    0    teacher_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.teacher_id_seq OWNED BY public.teacher.id;
          public          postgres    false    226            �            1259    31131    user    TABLE     F  CREATE TABLE public."user" (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying(256) NOT NULL,
    email character varying NOT NULL,
    "idDocument" character varying NOT NULL,
    role character varying DEFAULT 'teacher'::character varying NOT NULL,
    password character varying(256) NOT NULL,
    "teacherId" integer,
    "schoolId" integer,
    "departmentId" integer
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    31130    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    240            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    239            �           2604    21821 	   career id    DEFAULT     f   ALTER TABLE ONLY public.career ALTER COLUMN id SET DEFAULT nextval('public.career_id_seq'::regclass);
 8   ALTER TABLE public.career ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    21838    classroom id    DEFAULT     l   ALTER TABLE ONLY public.classroom ALTER COLUMN id SET DEFAULT nextval('public.classroom_id_seq'::regclass);
 ;   ALTER TABLE public.classroom ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    21860    day id    DEFAULT     `   ALTER TABLE ONLY public.day ALTER COLUMN id SET DEFAULT nextval('public.day_id_seq'::regclass);
 5   ALTER TABLE public.day ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    31008    department id    DEFAULT     n   ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);
 <   ALTER TABLE public.department ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234    235            �           2604    31067 	   period id    DEFAULT     f   ALTER TABLE ONLY public.period ALTER COLUMN id SET DEFAULT nextval('public.period_id_seq'::regclass);
 8   ALTER TABLE public.period ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237    238            �           2604    21940    schedule id    DEFAULT     j   ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);
 :   ALTER TABLE public.schedule ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    21787 	   school id    DEFAULT     f   ALTER TABLE ONLY public.school ALTER COLUMN id SET DEFAULT nextval('public.school_id_seq'::regclass);
 8   ALTER TABLE public.school ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    21927 
   section id    DEFAULT     h   ALTER TABLE ONLY public.section ALTER COLUMN id SET DEFAULT nextval('public.section_id_seq'::regclass);
 9   ALTER TABLE public.section ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    21892 
   subject id    DEFAULT     h   ALTER TABLE ONLY public.subject ALTER COLUMN id SET DEFAULT nextval('public.subject_id_seq'::regclass);
 9   ALTER TABLE public.subject ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    21907    subject_carrer id    DEFAULT     v   ALTER TABLE ONLY public.subject_carrer ALTER COLUMN id SET DEFAULT nextval('public.subject_carrer_id_seq'::regclass);
 @   ALTER TABLE public.subject_carrer ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    21914 
   teacher id    DEFAULT     h   ALTER TABLE ONLY public.teacher ALTER COLUMN id SET DEFAULT nextval('public.teacher_id_seq'::regclass);
 9   ALTER TABLE public.teacher ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    31134    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �          0    21818    career 
   TABLE DATA           �   COPY public.career (id, "createdAt", "updatedAt", status, deleted, name, description, logo, abbreviation, "departmentId") FROM stdin;
    public          postgres    false    217   b�       �          0    21835 	   classroom 
   TABLE DATA           k   COPY public.classroom (id, "createdAt", "updatedAt", status, deleted, name, description, type) FROM stdin;
    public          postgres    false    219   ��       �          0    31021     classroom_departments_department 
   TABLE DATA           Y   COPY public.classroom_departments_department ("classroomId", "departmentId") FROM stdin;
    public          postgres    false    236   0�       �          0    21857    day 
   TABLE DATA           `   COPY public.day (id, "createdAt", "updatedAt", status, deleted, name, abbreviation) FROM stdin;
    public          postgres    false    221   v�       �          0    31005 
   department 
   TABLE DATA           �   COPY public.department (id, "createdAt", "updatedAt", status, deleted, name, description, logo, abbreviation, "schoolId") FROM stdin;
    public          postgres    false    235   O�       �          0    31064    period 
   TABLE DATA           �   COPY public.period (id, "createdAt", "updatedAt", status, deleted, name, description, start, "end", "startTime", "endTime", "interval", duration, stage) FROM stdin;
    public          postgres    false    238   ��       �          0    21937    schedule 
   TABLE DATA           �   COPY public.schedule (id, "createdAt", "updatedAt", status, deleted, start, "end", "classroomId", "dayId", "sectionId", "periodId") FROM stdin;
    public          postgres    false    231   R�       �          0    21784    school 
   TABLE DATA           v   COPY public.school (id, "createdAt", "updatedAt", status, deleted, name, description, logo, abbreviation) FROM stdin;
    public          postgres    false    215   ��       �          0    21924    section 
   TABLE DATA           �   COPY public.section (id, "createdAt", "updatedAt", status, deleted, name, capacity, "subjectId", "periodId", "teacherId") FROM stdin;
    public          postgres    false    229   ��       �          0    21889    subject 
   TABLE DATA           �   COPY public.subject (id, "createdAt", "updatedAt", status, deleted, code, name, credits, description, hours, semester, "typeCurriculum", "departmentId") FROM stdin;
    public          postgres    false    223   A�       �          0    21973    subject_career 
   TABLE DATA           H   COPY public.subject_career ("subjectId", "subjectCarrerId") FROM stdin;
    public          postgres    false    232   H�       �          0    22137    subject_careers_career 
   TABLE DATA           I   COPY public.subject_careers_career ("subjectId", "careerId") FROM stdin;
    public          postgres    false    233   e�       �          0    21904    subject_carrer 
   TABLE DATA           E   COPY public.subject_carrer (id, "subjectId", "careerId") FROM stdin;
    public          postgres    false    225   ��       �          0    21911    teacher 
   TABLE DATA           �   COPY public.teacher (id, "createdAt", "updatedAt", status, deleted, email, "departmentId", "idDocument", "firstName", "lastName") FROM stdin;
    public          postgres    false    227   ��       �          0    31131    user 
   TABLE DATA           �   COPY public."user" (id, "createdAt", "updatedAt", status, deleted, name, email, "idDocument", role, password, "teacherId", "schoolId", "departmentId") FROM stdin;
    public          postgres    false    240   s�       �           0    0    career_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.career_id_seq', 2, true);
          public          postgres    false    216            �           0    0    classroom_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.classroom_id_seq', 31, true);
          public          postgres    false    218            �           0    0 
   day_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.day_id_seq', 7, true);
          public          postgres    false    220            �           0    0    department_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.department_id_seq', 1, false);
          public          postgres    false    234            �           0    0    period_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.period_id_seq', 1, true);
          public          postgres    false    237            �           0    0    schedule_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.schedule_id_seq', 2, true);
          public          postgres    false    230            �           0    0    school_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.school_id_seq', 1, false);
          public          postgres    false    214            �           0    0    section_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.section_id_seq', 2, true);
          public          postgres    false    228            �           0    0    subject_carrer_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.subject_carrer_id_seq', 1, false);
          public          postgres    false    224            �           0    0    subject_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.subject_id_seq', 11, true);
          public          postgres    false    222            �           0    0    teacher_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.teacher_id_seq', 4, true);
          public          postgres    false    226                        0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    239            �           2606    21900 &   subject PK_12eee115462e38d62e5455fc054 
   CONSTRAINT     f   ALTER TABLE ONLY public.subject
    ADD CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.subject DROP CONSTRAINT "PK_12eee115462e38d62e5455fc054";
       public            postgres    false    223                       2606    21948 '   schedule PK_1c05e42aec7371641193e180046 
   CONSTRAINT     g   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "PK_1c05e42aec7371641193e180046";
       public            postgres    false    231            �           2606    21922 &   teacher PK_2f807294148612a9751dacf1026 
   CONSTRAINT     f   ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.teacher DROP CONSTRAINT "PK_2f807294148612a9751dacf1026";
       public            postgres    false    227            
           2606    21977 -   subject_career PK_30e39a4074a04e82ebe60a2e9a2 
   CONSTRAINT     �   ALTER TABLE ONLY public.subject_career
    ADD CONSTRAINT "PK_30e39a4074a04e82ebe60a2e9a2" PRIMARY KEY ("subjectId", "subjectCarrerId");
 Y   ALTER TABLE ONLY public.subject_career DROP CONSTRAINT "PK_30e39a4074a04e82ebe60a2e9a2";
       public            postgres    false    232    232                       2606    21935 &   section PK_3c41d2d699384cc5e8eac54777d 
   CONSTRAINT     f   ALTER TABLE ONLY public.section
    ADD CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.section DROP CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d";
       public            postgres    false    229            �           2606    21909 -   subject_carrer PK_419a2d2e52c9d71e8f00855ee62 
   CONSTRAINT     m   ALTER TABLE ONLY public.subject_carrer
    ADD CONSTRAINT "PK_419a2d2e52c9d71e8f00855ee62" PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public.subject_carrer DROP CONSTRAINT "PK_419a2d2e52c9d71e8f00855ee62";
       public            postgres    false    225            �           2606    21868 "   day PK_42e726f6b72349f70b25598b50e 
   CONSTRAINT     b   ALTER TABLE ONLY public.day
    ADD CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.day DROP CONSTRAINT "PK_42e726f6b72349f70b25598b50e";
       public            postgres    false    221            �           2606    21795 %   school PK_57836c3fe2f2c7734b20911755e 
   CONSTRAINT     e   ALTER TABLE ONLY public.school
    ADD CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.school DROP CONSTRAINT "PK_57836c3fe2f2c7734b20911755e";
       public            postgres    false    215            �           2606    21829 %   career PK_5f694c0aa9babcae2c4ad61c7d0 
   CONSTRAINT     e   ALTER TABLE ONLY public.career
    ADD CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.career DROP CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0";
       public            postgres    false    217            �           2606    21846 (   classroom PK_729f896c8b7b96ddf10c341e6ff 
   CONSTRAINT     h   ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.classroom DROP CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff";
       public            postgres    false    219                       2606    31025 ?   classroom_departments_department PK_988b86f19e2de76a415e9fbc91d 
   CONSTRAINT     �   ALTER TABLE ONLY public.classroom_departments_department
    ADD CONSTRAINT "PK_988b86f19e2de76a415e9fbc91d" PRIMARY KEY ("classroomId", "departmentId");
 k   ALTER TABLE ONLY public.classroom_departments_department DROP CONSTRAINT "PK_988b86f19e2de76a415e9fbc91d";
       public            postgres    false    236    236                       2606    31016 )   department PK_9a2213262c1593bffb581e382f5 
   CONSTRAINT     i   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5";
       public            postgres    false    235                       2606    31075 %   period PK_cabecec858892ab647cd28673b8 
   CONSTRAINT     e   ALTER TABLE ONLY public.period
    ADD CONSTRAINT "PK_cabecec858892ab647cd28673b8" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.period DROP CONSTRAINT "PK_cabecec858892ab647cd28673b8";
       public            postgres    false    238                       2606    31143 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    240                       2606    22141 5   subject_careers_career PK_d9aad0bd79c26fbce1d4f509894 
   CONSTRAINT     �   ALTER TABLE ONLY public.subject_careers_career
    ADD CONSTRAINT "PK_d9aad0bd79c26fbce1d4f509894" PRIMARY KEY ("subjectId", "careerId");
 a   ALTER TABLE ONLY public.subject_careers_career DROP CONSTRAINT "PK_d9aad0bd79c26fbce1d4f509894";
       public            postgres    false    233    233                        2606    31095 &   teacher UQ_00634394dce7677d531749ed8e8 
   CONSTRAINT     d   ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE (email);
 R   ALTER TABLE ONLY public.teacher DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8";
       public            postgres    false    227            �           2606    21833 %   career UQ_049aa2018257501b63cb574672d 
   CONSTRAINT     j   ALTER TABLE ONLY public.career
    ADD CONSTRAINT "UQ_049aa2018257501b63cb574672d" UNIQUE (abbreviation);
 Q   ALTER TABLE ONLY public.career DROP CONSTRAINT "UQ_049aa2018257501b63cb574672d";
       public            postgres    false    217                       2606    31077 %   period UQ_174cd20f8f2058fcf8b0f5c2396 
   CONSTRAINT     b   ALTER TABLE ONLY public.period
    ADD CONSTRAINT "UQ_174cd20f8f2058fcf8b0f5c2396" UNIQUE (name);
 Q   ALTER TABLE ONLY public.period DROP CONSTRAINT "UQ_174cd20f8f2058fcf8b0f5c2396";
       public            postgres    false    238                        2606    31147 #   user UQ_3002e8134f299e3594726deea3c 
   CONSTRAINT     j   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_3002e8134f299e3594726deea3c" UNIQUE ("idDocument");
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_3002e8134f299e3594726deea3c";
       public            postgres    false    240            �           2606    21848 (   classroom UQ_321e9ff53b2d2b374d6e8d3df8e 
   CONSTRAINT     e   ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT "UQ_321e9ff53b2d2b374d6e8d3df8e" UNIQUE (name);
 T   ALTER TABLE ONLY public.classroom DROP CONSTRAINT "UQ_321e9ff53b2d2b374d6e8d3df8e";
       public            postgres    false    219                       2606    31018 )   department UQ_471da4b90e96c1ebe0af221e07b 
   CONSTRAINT     f   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE (name);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b";
       public            postgres    false    235            �           2606    21799 %   school UQ_4a7a9dbae0012986d5df9ed3fb3 
   CONSTRAINT     j   ALTER TABLE ONLY public.school
    ADD CONSTRAINT "UQ_4a7a9dbae0012986d5df9ed3fb3" UNIQUE (abbreviation);
 Q   ALTER TABLE ONLY public.school DROP CONSTRAINT "UQ_4a7a9dbae0012986d5df9ed3fb3";
       public            postgres    false    215            �           2606    21831 %   career UQ_5519c2c1506f96cb2efb3e0d609 
   CONSTRAINT     b   ALTER TABLE ONLY public.career
    ADD CONSTRAINT "UQ_5519c2c1506f96cb2efb3e0d609" UNIQUE (name);
 Q   ALTER TABLE ONLY public.career DROP CONSTRAINT "UQ_5519c2c1506f96cb2efb3e0d609";
       public            postgres    false    217            �           2606    21797 %   school UQ_73c2a2b94ffa6b0fabf50b64743 
   CONSTRAINT     b   ALTER TABLE ONLY public.school
    ADD CONSTRAINT "UQ_73c2a2b94ffa6b0fabf50b64743" UNIQUE (name);
 Q   ALTER TABLE ONLY public.school DROP CONSTRAINT "UQ_73c2a2b94ffa6b0fabf50b64743";
       public            postgres    false    215                       2606    31093 &   teacher UQ_7f07d413319b8a6f43d46916499 
   CONSTRAINT     k   ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "UQ_7f07d413319b8a6f43d46916499" UNIQUE ("idDocument");
 R   ALTER TABLE ONLY public.teacher DROP CONSTRAINT "UQ_7f07d413319b8a6f43d46916499";
       public            postgres    false    227            �           2606    21902 &   subject UQ_92374adc6b583e8cf659977e489 
   CONSTRAINT     c   ALTER TABLE ONLY public.subject
    ADD CONSTRAINT "UQ_92374adc6b583e8cf659977e489" UNIQUE (code);
 R   ALTER TABLE ONLY public.subject DROP CONSTRAINT "UQ_92374adc6b583e8cf659977e489";
       public            postgres    false    223            �           2606    21872 "   day UQ_a48dd9be12adab243b10ff7f44d 
   CONSTRAINT     g   ALTER TABLE ONLY public.day
    ADD CONSTRAINT "UQ_a48dd9be12adab243b10ff7f44d" UNIQUE (abbreviation);
 N   ALTER TABLE ONLY public.day DROP CONSTRAINT "UQ_a48dd9be12adab243b10ff7f44d";
       public            postgres    false    221                       2606    31020 )   department UQ_a53804f1df46643eda9b6884898 
   CONSTRAINT     n   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "UQ_a53804f1df46643eda9b6884898" UNIQUE (abbreviation);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "UQ_a53804f1df46643eda9b6884898";
       public            postgres    false    235            �           2606    21870 "   day UQ_a8dd9a67928e68dfd0d1fa4a75e 
   CONSTRAINT     _   ALTER TABLE ONLY public.day
    ADD CONSTRAINT "UQ_a8dd9a67928e68dfd0d1fa4a75e" UNIQUE (name);
 N   ALTER TABLE ONLY public.day DROP CONSTRAINT "UQ_a8dd9a67928e68dfd0d1fa4a75e";
       public            postgres    false    221            "           2606    31145 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public            postgres    false    240                       1259    31026    IDX_1e50399ca949400fb862ba588a    INDEX     v   CREATE INDEX "IDX_1e50399ca949400fb862ba588a" ON public.classroom_departments_department USING btree ("classroomId");
 4   DROP INDEX public."IDX_1e50399ca949400fb862ba588a";
       public            postgres    false    236                       1259    22142    IDX_4f3aaebcadbb1f4e97a3801f88    INDEX     j   CREATE INDEX "IDX_4f3aaebcadbb1f4e97a3801f88" ON public.subject_careers_career USING btree ("subjectId");
 4   DROP INDEX public."IDX_4f3aaebcadbb1f4e97a3801f88";
       public            postgres    false    233                       1259    22143    IDX_59dcc0c3cdad4ce8b158dc672c    INDEX     i   CREATE INDEX "IDX_59dcc0c3cdad4ce8b158dc672c" ON public.subject_careers_career USING btree ("careerId");
 4   DROP INDEX public."IDX_59dcc0c3cdad4ce8b158dc672c";
       public            postgres    false    233                       1259    21979    IDX_9d9f9ae53c3fa2f0d9627777b5    INDEX     h   CREATE INDEX "IDX_9d9f9ae53c3fa2f0d9627777b5" ON public.subject_career USING btree ("subjectCarrerId");
 4   DROP INDEX public."IDX_9d9f9ae53c3fa2f0d9627777b5";
       public            postgres    false    232                       1259    21978    IDX_b3adc0d196cc6aad0c2a433e99    INDEX     b   CREATE INDEX "IDX_b3adc0d196cc6aad0c2a433e99" ON public.subject_career USING btree ("subjectId");
 4   DROP INDEX public."IDX_b3adc0d196cc6aad0c2a433e99";
       public            postgres    false    232                       1259    31027    IDX_bd26f30f2040a57b49559302bc    INDEX     w   CREATE INDEX "IDX_bd26f30f2040a57b49559302bc" ON public.classroom_departments_department USING btree ("departmentId");
 4   DROP INDEX public."IDX_bd26f30f2040a57b49559302bc";
       public            postgres    false    236            #           1259    31148    user_role_index    INDEX     B   CREATE INDEX user_role_index ON public."user" USING btree (role);
 #   DROP INDEX public.user_role_index;
       public            postgres    false    240            5           2606    31053 ?   classroom_departments_department FK_1e50399ca949400fb862ba588a9    FK CONSTRAINT     �   ALTER TABLE ONLY public.classroom_departments_department
    ADD CONSTRAINT "FK_1e50399ca949400fb862ba588a9" FOREIGN KEY ("classroomId") REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE CASCADE;
 k   ALTER TABLE ONLY public.classroom_departments_department DROP CONSTRAINT "FK_1e50399ca949400fb862ba588a9";
       public          postgres    false    236    219    3310            )           2606    31078 &   section FK_1e97ca7113f4b56427b87b030da    FK CONSTRAINT     �   ALTER TABLE ONLY public.section
    ADD CONSTRAINT "FK_1e97ca7113f4b56427b87b030da" FOREIGN KEY ("periodId") REFERENCES public.period(id);
 R   ALTER TABLE ONLY public.section DROP CONSTRAINT "FK_1e97ca7113f4b56427b87b030da";
       public          postgres    false    238    229    3354            &           2606    22005 -   subject_carrer FK_25c5af064b8d15c934893c6b007    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_carrer
    ADD CONSTRAINT "FK_25c5af064b8d15c934893c6b007" FOREIGN KEY ("subjectId") REFERENCES public.subject(id);
 Y   ALTER TABLE ONLY public.subject_carrer DROP CONSTRAINT "FK_25c5af064b8d15c934893c6b007";
       public          postgres    false    225    3320    223            (           2606    31043 &   teacher FK_2a1ede65e872f94f99b4b442c28    FK CONSTRAINT     �   ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "FK_2a1ede65e872f94f99b4b442c28" FOREIGN KEY ("departmentId") REFERENCES public.department(id);
 R   ALTER TABLE ONLY public.teacher DROP CONSTRAINT "FK_2a1ede65e872f94f99b4b442c28";
       public          postgres    false    3344    227    235            ,           2606    22045 '   schedule FK_302e3c4f61ccb496bf99635c03d    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_302e3c4f61ccb496bf99635c03d" FOREIGN KEY ("sectionId") REFERENCES public.section(id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_302e3c4f61ccb496bf99635c03d";
       public          postgres    false    231    3332    229            %           2606    31033 &   subject FK_31e43ac2a7451ee88ed17da939c    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject
    ADD CONSTRAINT "FK_31e43ac2a7451ee88ed17da939c" FOREIGN KEY ("departmentId") REFERENCES public.department(id);
 R   ALTER TABLE ONLY public.subject DROP CONSTRAINT "FK_31e43ac2a7451ee88ed17da939c";
       public          postgres    false    235    223    3344            7           2606    31159 #   user FK_3d6915a33798152a079997cad28    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_3d6915a33798152a079997cad28" FOREIGN KEY ("departmentId") REFERENCES public.department(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_3d6915a33798152a079997cad28";
       public          postgres    false    240    235    3344            4           2606    31028 )   department FK_40705109f3ea7b9d3bc2e344630    FK CONSTRAINT     �   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "FK_40705109f3ea7b9d3bc2e344630" FOREIGN KEY ("schoolId") REFERENCES public.school(id);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "FK_40705109f3ea7b9d3bc2e344630";
       public          postgres    false    3298    215    235            2           2606    22144 5   subject_careers_career FK_4f3aaebcadbb1f4e97a3801f88e    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_careers_career
    ADD CONSTRAINT "FK_4f3aaebcadbb1f4e97a3801f88e" FOREIGN KEY ("subjectId") REFERENCES public.subject(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.subject_careers_career DROP CONSTRAINT "FK_4f3aaebcadbb1f4e97a3801f88e";
       public          postgres    false    3320    233    223            3           2606    22154 5   subject_careers_career FK_59dcc0c3cdad4ce8b158dc672ce    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_careers_career
    ADD CONSTRAINT "FK_59dcc0c3cdad4ce8b158dc672ce" FOREIGN KEY ("careerId") REFERENCES public.career(id);
 a   ALTER TABLE ONLY public.subject_careers_career DROP CONSTRAINT "FK_59dcc0c3cdad4ce8b158dc672ce";
       public          postgres    false    217    3304    233            8           2606    31154 #   user FK_709e51110daa2b560f0fc32367b    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_709e51110daa2b560f0fc32367b" FOREIGN KEY ("schoolId") REFERENCES public.school(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_709e51110daa2b560f0fc32367b";
       public          postgres    false    3298    240    215            $           2606    31038 %   career FK_71da4bb33a02f433ca6da1015cd    FK CONSTRAINT     �   ALTER TABLE ONLY public.career
    ADD CONSTRAINT "FK_71da4bb33a02f433ca6da1015cd" FOREIGN KEY ("departmentId") REFERENCES public.department(id);
 Q   ALTER TABLE ONLY public.career DROP CONSTRAINT "FK_71da4bb33a02f433ca6da1015cd";
       public          postgres    false    3344    235    217            -           2606    22035 '   schedule FK_80bb3cb1fed787e813fa4a3b21e    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_80bb3cb1fed787e813fa4a3b21e" FOREIGN KEY ("classroomId") REFERENCES public.classroom(id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_80bb3cb1fed787e813fa4a3b21e";
       public          postgres    false    231    219    3310            *           2606    22020 &   section FK_8e08580552aa3a81330b1d57526    FK CONSTRAINT     �   ALTER TABLE ONLY public.section
    ADD CONSTRAINT "FK_8e08580552aa3a81330b1d57526" FOREIGN KEY ("subjectId") REFERENCES public.subject(id);
 R   ALTER TABLE ONLY public.section DROP CONSTRAINT "FK_8e08580552aa3a81330b1d57526";
       public          postgres    false    223    229    3320            '           2606    22010 -   subject_carrer FK_946fc8ce24238f1068b7bd88e88    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_carrer
    ADD CONSTRAINT "FK_946fc8ce24238f1068b7bd88e88" FOREIGN KEY ("careerId") REFERENCES public.career(id);
 Y   ALTER TABLE ONLY public.subject_carrer DROP CONSTRAINT "FK_946fc8ce24238f1068b7bd88e88";
       public          postgres    false    3304    225    217            0           2606    22085 -   subject_career FK_9d9f9ae53c3fa2f0d9627777b5e    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_career
    ADD CONSTRAINT "FK_9d9f9ae53c3fa2f0d9627777b5e" FOREIGN KEY ("subjectCarrerId") REFERENCES public.subject_carrer(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.subject_career DROP CONSTRAINT "FK_9d9f9ae53c3fa2f0d9627777b5e";
       public          postgres    false    225    232    3324            .           2606    31083 '   schedule FK_9ea1c21db52a8393ff4da6cdc77    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_9ea1c21db52a8393ff4da6cdc77" FOREIGN KEY ("periodId") REFERENCES public.period(id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_9ea1c21db52a8393ff4da6cdc77";
       public          postgres    false    3354    231    238            /           2606    22040 '   schedule FK_a38a4f7ba893c06c097a21166bd    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_a38a4f7ba893c06c097a21166bd" FOREIGN KEY ("dayId") REFERENCES public.day(id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_a38a4f7ba893c06c097a21166bd";
       public          postgres    false    3314    221    231            +           2606    22030 &   section FK_b326c8280ab32f8840ce24a2492    FK CONSTRAINT     �   ALTER TABLE ONLY public.section
    ADD CONSTRAINT "FK_b326c8280ab32f8840ce24a2492" FOREIGN KEY ("teacherId") REFERENCES public.teacher(id);
 R   ALTER TABLE ONLY public.section DROP CONSTRAINT "FK_b326c8280ab32f8840ce24a2492";
       public          postgres    false    229    3326    227            1           2606    22080 -   subject_career FK_b3adc0d196cc6aad0c2a433e999    FK CONSTRAINT     �   ALTER TABLE ONLY public.subject_career
    ADD CONSTRAINT "FK_b3adc0d196cc6aad0c2a433e999" FOREIGN KEY ("subjectId") REFERENCES public.subject(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.subject_career DROP CONSTRAINT "FK_b3adc0d196cc6aad0c2a433e999";
       public          postgres    false    223    232    3320            6           2606    31058 ?   classroom_departments_department FK_bd26f30f2040a57b49559302bc8    FK CONSTRAINT     �   ALTER TABLE ONLY public.classroom_departments_department
    ADD CONSTRAINT "FK_bd26f30f2040a57b49559302bc8" FOREIGN KEY ("departmentId") REFERENCES public.department(id) ON UPDATE CASCADE ON DELETE CASCADE;
 k   ALTER TABLE ONLY public.classroom_departments_department DROP CONSTRAINT "FK_bd26f30f2040a57b49559302bc8";
       public          postgres    false    3344    236    235            9           2606    31149 #   user FK_d841b74fd2e92061b15c20d4eaa    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa" FOREIGN KEY ("teacherId") REFERENCES public.teacher(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa";
       public          postgres    false    3326    227    240            �   �   x�3�4202�5��5�T02�25�25�3�4434C���25�3�0670�,�L���KO��L-:�6Q!%U!8��$57��3��<]�9��P1�20�22�34321�+�i~�B@jI���9��p8��b���� �0�      �   ,  x�}�Mn1���)r�����t�6@�ͺ'��Q)�&I0�����#��.�,��HOdE������!q<Q*�E�	9]�]�^n�������z{������3͊9xRN�	`vL2h|��L��)兖
:$�Z��ir��DS.BYS�F9��A�3�N4/(�3FZi̐s�٠����ZN�+�I�B��L���8�B���YpJ��0�����t���0��A3hR�<p�T�g\]9����H
��A��J2�D3�b].H���c�h+�T�XX�Բ�֝�/��	�;"��Ԧ*�\1(I77�k�k�C���f�Z#H��Ig.oj�H���R�M7�3����#���L8�hA�aV/���a1�sjIΉxG;�/�M�ʋ9���9�N漏�3X֚����ro����7%���d��:jZ��k�͑�C牢{}�	�z�q��k���>�^$$Y�#�$V��A�i�洰�n��-}�~�/�gwKfh��j��+��-ec>��MZ2A�!�h�eI�E�%�w��AZ���8��|��u0��$�����?�ܯ�      �   6   x�ʹ  ��Ü�����l��G�<a����(�4$4谀��y�v���s
�      �   �   x�}�A
�0EםSxC2��I֮DW�+7U��Bm��K�ы�t�����y3D(��JΥ���r�IK�r�+�ź�W�x�UbA̡�CѲ)�.hB �]�5Z��e�h��û=6ר
OH�:�$�*f�Cѵ�g����.9�n�L��/��]]��B�Mˆ�&2�s��vx�S3&,������T��ɡ(Z6��~ib�^ �vo�      �   x   x�3�4202�5��56T02�21�20ѳ�0��0�'U�陗����Ztxm�BJ�BpfqIjnb1g��xsr���5�T04�21�20��Y��bv@jI���9��p�]����qqq gn/�      �   k   x�]�1�0��+��.^�\G������x�1�Ю���ϊ�Θ���r�l��0fg?"oy�M� ��ju������<�X�A
�P�s�_����T�z      �   \   x�}̱�0�ڙ�b�߉L<5���E�_��G!���162ǞN�Z6��:�	�=�*B�f�,���xU�Xe���'��7X\����.8�      �     x�}�Kn� E�fl ��3by�I'if�PC#$Ǯ���t]E6V\�iD�H\�]hŀ�4+�fT%B���GQ�^�.�g?X�<ގG??_�,��m�cl��m�u6V��eu�� Vr�F���èP�$�)��Yl�)�!�٦��gmw���t"U�~-���u���������C?�*����4��JP��>*z��Z-�l������$�e�g�{4UZ4a�%�"��)ѰZ�lMճ�	{�u��<�A}�K�;      �   X   x�}̱�0���F�;f�ԙ �+RK)R��A�ݴ�7[e(���Pf!%r:&�t���AF`�8Pq��̈�G����)�� ���      �   �   x�}��m�0�4��@R/F7�N�U8Ρ@Ν�K����X�E�&(����H"
2�8�6B�@�w��}�w�#�6�N����sS��(L-$�ޅQ�&b�`��<����=�<�SiOM��˨���[.]n�z)Ӑz��Rߕ)�C9�>�
���o#m���=��j�}�_�:�nJCZ����9��NRv��\Is%�me���F!G�сF��}r���j�l�_c�$I������b�      �      x������ � �      �      x���4�bCN#�=... �H      �      x������ � �      �   �   x�}���0��s�� �֮���>���@H���7F�1^�o�K� ����f���P���;af�@E0�ً ��&N�g}��!���s����9`�ɳ���{�?�mcp�ɉ3�M�kÅ��2�7�/Ԯ*�؏(�>�,u���/=إ���Z/S��J	�Sj�9MꨕRwu V�      �   �   x�}�KO�@���+�`�qb����ZR')�����0�0�����nԘޜ�MNN�Q��sJ�ͨ�3ǧ^����jD5
J��N�q���Q�R#~/{�w ��J��E�9E�=A6�mJlѼ��VNqC��1�u��n������ی����(�^o�l�>C��9��[���B)u.U'z�rhg���>?��w����~Hԃ�W�Cj��P�r�bQ�$O�SS�=$���6�{���.��?`˲� +�i�     