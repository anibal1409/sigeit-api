PGDMP     5                	    {         
   udo_sigeit    15.4    15.4     ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            >           1262    19145 
   udo_sigeit    DATABASE     �   CREATE DATABASE udo_sigeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE udo_sigeit;
                postgres    false            �            1259    31131    user    TABLE     F  CREATE TABLE public."user" (
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
       public          postgres    false    240            ?           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    239            �           2604    31134    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            8          0    31131    user 
   TABLE DATA           �   COPY public."user" (id, "createdAt", "updatedAt", status, deleted, name, email, "idDocument", role, password, "teacherId", "schoolId", "departmentId") FROM stdin;
    public          postgres    false    240          @           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    239            �           2606    31143 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    240            �           2606    31147 #   user UQ_3002e8134f299e3594726deea3c 
   CONSTRAINT     j   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_3002e8134f299e3594726deea3c" UNIQUE ("idDocument");
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_3002e8134f299e3594726deea3c";
       public            postgres    false    240            �           2606    31145 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public            postgres    false    240            �           1259    31148    user_role_index    INDEX     B   CREATE INDEX user_role_index ON public."user" USING btree (role);
 #   DROP INDEX public.user_role_index;
       public            postgres    false    240            �           2606    31159 #   user FK_3d6915a33798152a079997cad28    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_3d6915a33798152a079997cad28" FOREIGN KEY ("departmentId") REFERENCES public.department(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_3d6915a33798152a079997cad28";
       public          postgres    false    240            �           2606    31154 #   user FK_709e51110daa2b560f0fc32367b    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_709e51110daa2b560f0fc32367b" FOREIGN KEY ("schoolId") REFERENCES public.school(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_709e51110daa2b560f0fc32367b";
       public          postgres    false    240            �           2606    31149 #   user FK_d841b74fd2e92061b15c20d4eaa    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa" FOREIGN KEY ("teacherId") REFERENCES public.teacher(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_d841b74fd2e92061b15c20d4eaa";
       public          postgres    false    240            8   �   x�}�KO�@���+�`�qb����ZR')�����0�0�����nԘޜ�MNN�Q��sJ�ͨ�3ǧ^����jD5
J��N�q���Q�R#~/{�w ��J��E�9E�=A6�mJlѼ��VNqC��1�u��n������ی����(�^o�l�>C��9��[���B)u.U'z�rhg���>?��w����~Hԃ�W�Cj��P�r�bQ�$O�SS�=$���6�{���.��?`˲� +�i�     