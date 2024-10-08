PGDMP     2                	    {         
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
                postgres    false            �            1259    21857    day    TABLE     S  CREATE TABLE public.day (
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
       public          postgres    false    221            :           0    0 
   day_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.day_id_seq OWNED BY public.day.id;
          public          postgres    false    220            �           2604    21860    day id    DEFAULT     `   ALTER TABLE ONLY public.day ALTER COLUMN id SET DEFAULT nextval('public.day_id_seq'::regclass);
 5   ALTER TABLE public.day ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            3          0    21857    day 
   TABLE DATA           `   COPY public.day (id, "createdAt", "updatedAt", status, deleted, name, abbreviation) FROM stdin;
    public          postgres    false    221          ;           0    0 
   day_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.day_id_seq', 7, true);
          public          postgres    false    220            �           2606    21868 "   day PK_42e726f6b72349f70b25598b50e 
   CONSTRAINT     b   ALTER TABLE ONLY public.day
    ADD CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.day DROP CONSTRAINT "PK_42e726f6b72349f70b25598b50e";
       public            postgres    false    221            �           2606    21872 "   day UQ_a48dd9be12adab243b10ff7f44d 
   CONSTRAINT     g   ALTER TABLE ONLY public.day
    ADD CONSTRAINT "UQ_a48dd9be12adab243b10ff7f44d" UNIQUE (abbreviation);
 N   ALTER TABLE ONLY public.day DROP CONSTRAINT "UQ_a48dd9be12adab243b10ff7f44d";
       public            postgres    false    221            �           2606    21870 "   day UQ_a8dd9a67928e68dfd0d1fa4a75e 
   CONSTRAINT     _   ALTER TABLE ONLY public.day
    ADD CONSTRAINT "UQ_a8dd9a67928e68dfd0d1fa4a75e" UNIQUE (name);
 N   ALTER TABLE ONLY public.day DROP CONSTRAINT "UQ_a8dd9a67928e68dfd0d1fa4a75e";
       public            postgres    false    221            3   �   x�}�A
�0EםSxC2��I֮DW�+7U��Bm��K�ы�t�����y3D(��JΥ���r�IK�r�+�ź�W�x�UbA̡�CѲ)�.hB �]�5Z��e�h��û=6ר
OH�:�$�*f�Cѵ�g����.9�n�L��/��]]��B�Mˆ�&2�s��vx�S3&,������T��ɡ(Z6��~ib�^ �vo�     