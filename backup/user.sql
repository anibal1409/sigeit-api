PGDMP     &    0                {         
   udo_sigeit    15.4    15.4     .           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            /           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            0           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            1           1262    16398 
   udo_sigeit    DATABASE     �   CREATE DATABASE udo_sigeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE udo_sigeit;
                postgres    false            �            1259    16881    user    TABLE       CREATE TABLE public."user" (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    deleted boolean DEFAULT false,
    name character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    role character varying DEFAULT 'teacher'::character varying NOT NULL,
    password character varying(256) NOT NULL,
    "teacherId" integer,
    "schoolId" integer,
    "departmentId" integer
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16880    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    236            2           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    235            �           2604    16884    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    236    236            +          0    16881    user 
   TABLE DATA           �   COPY public."user" (id, "createdAt", "updatedAt", status, deleted, name, email, role, password, "teacherId", "schoolId", "departmentId") FROM stdin;
    public          postgres    false    236   �       3           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 1, true);
          public          postgres    false    235            �           2606    16893 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    236            �           2606    16895 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public            postgres    false    236            �           1259    16896    user_role_index    INDEX     B   CREATE INDEX user_role_index ON public."user" USING btree (role);
 #   DROP INDEX public.user_role_index;
       public            postgres    false    236            �           2606    16902 #   user FK_709e51110daa2b560f0fc32367b    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_709e51110daa2b560f0fc32367b" FOREIGN KEY ("schoolId") REFERENCES public.school(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_709e51110daa2b560f0fc32367b";
       public          postgres    false    236            �           2606    16897 #   user FK_d841b74fd2e92061b15c20d4eaa    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa" FOREIGN KEY ("teacherId") REFERENCES public.teacher(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa";
       public          postgres    false    236            +   �   x�}ʱ�0@ѹ�
V���D%����<�4B��7���n�8�>�}S�!0��%��ȍd��'7�ΎdB}E�^�5vPZM+m������I<h��{k�FY@�ٗ2�������ݡ�K�l�C��.+���/Q�HE��/Z3J�:3	     