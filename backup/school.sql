PGDMP                     	    {         
   udo_sigeit    15.4    15.4     6           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            7           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            8           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            9           1262    19145 
   udo_sigeit    DATABASE     �   CREATE DATABASE udo_sigeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE udo_sigeit;
                postgres    false            �            1259    21784    school    TABLE     �  CREATE TABLE public.school (
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
       public          postgres    false    215            :           0    0    school_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.school_id_seq OWNED BY public.school.id;
          public          postgres    false    214            �           2604    21787 	   school id    DEFAULT     f   ALTER TABLE ONLY public.school ALTER COLUMN id SET DEFAULT nextval('public.school_id_seq'::regclass);
 8   ALTER TABLE public.school ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            3          0    21784    school 
   TABLE DATA           v   COPY public.school (id, "createdAt", "updatedAt", status, deleted, name, description, logo, abbreviation) FROM stdin;
    public          postgres    false    215   �       ;           0    0    school_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.school_id_seq', 1, false);
          public          postgres    false    214            �           2606    21795 %   school PK_57836c3fe2f2c7734b20911755e 
   CONSTRAINT     e   ALTER TABLE ONLY public.school
    ADD CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.school DROP CONSTRAINT "PK_57836c3fe2f2c7734b20911755e";
       public            postgres    false    215            �           2606    21799 %   school UQ_4a7a9dbae0012986d5df9ed3fb3 
   CONSTRAINT     j   ALTER TABLE ONLY public.school
    ADD CONSTRAINT "UQ_4a7a9dbae0012986d5df9ed3fb3" UNIQUE (abbreviation);
 Q   ALTER TABLE ONLY public.school DROP CONSTRAINT "UQ_4a7a9dbae0012986d5df9ed3fb3";
       public            postgres    false    215            �           2606    21797 %   school UQ_73c2a2b94ffa6b0fabf50b64743 
   CONSTRAINT     b   ALTER TABLE ONLY public.school
    ADD CONSTRAINT "UQ_73c2a2b94ffa6b0fabf50b64743" UNIQUE (name);
 Q   ALTER TABLE ONLY public.school DROP CONSTRAINT "UQ_73c2a2b94ffa6b0fabf50b64743";
       public            postgres    false    215            3     x�}�Kn� E�fl ��3by�I'if�PC#$Ǯ���t]E6V\�iD�H\�]hŀ�4+�fT%B���GQ�^�.�g?X�<ގG??_�,��m�cl��m�u6V��eu�� Vr�F���èP�$�)��Yl�)�!�٦��gmw���t"U�~-���u���������C?�*����4��JP��>*z��Z-�l������$�e�g�{4UZ4a�%�"��)ѰZ�lMճ�	{�u��<�A}�K�;     