PGDMP                     	    {         
   udo_sigeit    15.4    15.4     7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    19145 
   udo_sigeit    DATABASE     �   CREATE DATABASE udo_sigeit WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE udo_sigeit;
                postgres    false            �            1259    31005 
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
       public          postgres    false    235            ;           0    0    department_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;
          public          postgres    false    234            �           2604    31008    department id    DEFAULT     n   ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);
 <   ALTER TABLE public.department ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    234    235            4          0    31005 
   department 
   TABLE DATA           �   COPY public.department (id, "createdAt", "updatedAt", status, deleted, name, description, logo, abbreviation, "schoolId") FROM stdin;
    public          postgres    false    235   �       <           0    0    department_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.department_id_seq', 1, false);
          public          postgres    false    234            �           2606    31016 )   department PK_9a2213262c1593bffb581e382f5 
   CONSTRAINT     i   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5";
       public            postgres    false    235            �           2606    31018 )   department UQ_471da4b90e96c1ebe0af221e07b 
   CONSTRAINT     f   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE (name);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b";
       public            postgres    false    235            �           2606    31020 )   department UQ_a53804f1df46643eda9b6884898 
   CONSTRAINT     n   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "UQ_a53804f1df46643eda9b6884898" UNIQUE (abbreviation);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "UQ_a53804f1df46643eda9b6884898";
       public            postgres    false    235            �           2606    31028 )   department FK_40705109f3ea7b9d3bc2e344630    FK CONSTRAINT     �   ALTER TABLE ONLY public.department
    ADD CONSTRAINT "FK_40705109f3ea7b9d3bc2e344630" FOREIGN KEY ("schoolId") REFERENCES public.school(id);
 U   ALTER TABLE ONLY public.department DROP CONSTRAINT "FK_40705109f3ea7b9d3bc2e344630";
       public          postgres    false    235            4   x   x�3�4202�5��56T02�21�20ѳ�0��0�'U�陗����Ztxm�BJ�BpfqIjnb1g��xsr���5�T04�21�20��Y��bv@jI���9��p�]����qqq gn/�     