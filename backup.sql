PGDMP  ,    9                |            friendspace    16.0    16.0 7    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    35548    friendspace    DATABASE        CREATE DATABASE friendspace WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE friendspace;
                postgres    false                        2615    43365    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            [           1247    43487    FriendshipStatuses    TYPE     `   CREATE TYPE public."FriendshipStatuses" AS ENUM (
    'REQUEST_SENT',
    'REQUEST_ACCEPTED'
);
 '   DROP TYPE public."FriendshipStatuses";
       public          postgres    false    5            �            1259    43366    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    43543    chat_participants    TABLE     f   CREATE TABLE public.chat_participants (
    chat_id integer NOT NULL,
    user_id integer NOT NULL
);
 %   DROP TABLE public.chat_participants;
       public         heap    postgres    false    5            �            1259    43535    chats    TABLE     W   CREATE TABLE public.chats (
    id integer NOT NULL,
    name text,
    avatar text
);
    DROP TABLE public.chats;
       public         heap    postgres    false    5            �            1259    43534    chats_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.chats_id_seq;
       public          postgres    false    5    224            �           0    0    chats_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;
          public          postgres    false    223            �            1259    43394    friendships    TABLE     �   CREATE TABLE public.friendships (
    inviter_id integer NOT NULL,
    accepter_id integer NOT NULL,
    status public."FriendshipStatuses" DEFAULT 'REQUEST_SENT'::public."FriendshipStatuses" NOT NULL
);
    DROP TABLE public.friendships;
       public         heap    postgres    false    859    859    5            �            1259    43508    message_files    TABLE     x   CREATE TABLE public.message_files (
    id integer NOT NULL,
    name text NOT NULL,
    message_id integer NOT NULL
);
 !   DROP TABLE public.message_files;
       public         heap    postgres    false    5            �            1259    43507    message_files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.message_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.message_files_id_seq;
       public          postgres    false    222    5            �           0    0    message_files_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.message_files_id_seq OWNED BY public.message_files.id;
          public          postgres    false    221            �            1259    43498    messages    TABLE     �  CREATE TABLE public.messages (
    id integer NOT NULL,
    text text,
    chat_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(3) without time zone,
    is_read boolean DEFAULT false NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sender_id integer NOT NULL
);
    DROP TABLE public.messages;
       public         heap    postgres    false    5            �            1259    43497    messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    220    5            �           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    219            �            1259    43385    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    nickname text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    avatar text
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    43384    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    5    217            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            A           2604    43538    chats id    DEFAULT     d   ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);
 7   ALTER TABLE public.chats ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            @           2604    43511    message_files id    DEFAULT     t   ALTER TABLE ONLY public.message_files ALTER COLUMN id SET DEFAULT nextval('public.message_files_id_seq'::regclass);
 ?   ALTER TABLE public.message_files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            <           2604    43501    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            :           2604    43388    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �          0    43366    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �@       �          0    43543    chat_participants 
   TABLE DATA           =   COPY public.chat_participants (chat_id, user_id) FROM stdin;
    public          postgres    false    225   TE       �          0    43535    chats 
   TABLE DATA           1   COPY public.chats (id, name, avatar) FROM stdin;
    public          postgres    false    224   �E       �          0    43394    friendships 
   TABLE DATA           F   COPY public.friendships (inviter_id, accepter_id, status) FROM stdin;
    public          postgres    false    218   �E       �          0    43508    message_files 
   TABLE DATA           =   COPY public.message_files (id, name, message_id) FROM stdin;
    public          postgres    false    222   �E       �          0    43498    messages 
   TABLE DATA           m   COPY public.messages (id, text, chat_id, created_at, deleted_at, is_read, updated_at, sender_id) FROM stdin;
    public          postgres    false    220   	F       �          0    43385    users 
   TABLE DATA           F   COPY public.users (id, nickname, login, password, avatar) FROM stdin;
    public          postgres    false    217   HH                   0    0    chats_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.chats_id_seq', 3, true);
          public          postgres    false    223                       0    0    message_files_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.message_files_id_seq', 1, false);
          public          postgres    false    221                       0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 27, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.users_id_seq', 108, true);
          public          postgres    false    216            C           2606    43374 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            R           2606    43547 (   chat_participants chat_participants_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.chat_participants
    ADD CONSTRAINT chat_participants_pkey PRIMARY KEY (chat_id, user_id);
 R   ALTER TABLE ONLY public.chat_participants DROP CONSTRAINT chat_participants_pkey;
       public            postgres    false    225    225            P           2606    43542    chats chats_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_pkey;
       public            postgres    false    224            J           2606    43483    friendships friendships_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_pkey PRIMARY KEY (inviter_id, accepter_id);
 F   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friendships_pkey;
       public            postgres    false    218    218            N           2606    43515     message_files message_files_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.message_files
    ADD CONSTRAINT message_files_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.message_files DROP CONSTRAINT message_files_pkey;
       public            postgres    false    222            L           2606    43506    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    220            G           2606    43392    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            H           1259    43437 &   friendships_inviter_id_accepter_id_key    INDEX     x   CREATE UNIQUE INDEX friendships_inviter_id_accepter_id_key ON public.friendships USING btree (inviter_id, accepter_id);
 :   DROP INDEX public.friendships_inviter_id_accepter_id_key;
       public            postgres    false    218    218            D           1259    43436    users_login_key    INDEX     I   CREATE UNIQUE INDEX users_login_key ON public.users USING btree (login);
 #   DROP INDEX public.users_login_key;
       public            postgres    false    217            E           1259    43435    users_nickname_key    INDEX     O   CREATE UNIQUE INDEX users_nickname_key ON public.users USING btree (nickname);
 &   DROP INDEX public.users_nickname_key;
       public            postgres    false    217            X           2606    43548 0   chat_participants chat_participants_chat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat_participants
    ADD CONSTRAINT chat_participants_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public.chat_participants DROP CONSTRAINT chat_participants_chat_id_fkey;
       public          postgres    false    225    224    4688            Y           2606    43553 0   chat_participants chat_participants_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat_participants
    ADD CONSTRAINT chat_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Z   ALTER TABLE ONLY public.chat_participants DROP CONSTRAINT chat_participants_user_id_fkey;
       public          postgres    false    217    4679    225            S           2606    43451 (   friendships friendships_accepter_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_accepter_id_fkey FOREIGN KEY (accepter_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friendships_accepter_id_fkey;
       public          postgres    false    218    217    4679            T           2606    43446 '   friendships friendships_inviter_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_inviter_id_fkey FOREIGN KEY (inviter_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friendships_inviter_id_fkey;
       public          postgres    false    217    218    4679            W           2606    43526 +   message_files message_files_message_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_files
    ADD CONSTRAINT message_files_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.message_files DROP CONSTRAINT message_files_message_id_fkey;
       public          postgres    false    220    222    4684            U           2606    43558    messages messages_chat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_chat_id_fkey;
       public          postgres    false    4688    224    220            V           2606    44703     messages messages_sender_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_sender_id_fkey;
       public          postgres    false    4679    217    220            �   �  x����nGE���"�2x)I}D� @�.�D�,:G3��C]��dY?АZhu��6�&}��JP�z+u�.{�1�ll8�6����V��fG�1��Tp�5��B�=Q���.9P-�y�BtE�J�sEf�@}z
�������r�������)��{�I�5��Nߥ�b�P6?~��{�St��5x9/3�[���k�{��a�T����A�M���;1����}�c�_��:�q��8_����#n�|@�����T�1b7-�Ѣq�+����E��=dD۪�nK����{� ��M��{�I���xuO}�
���J�s\��:V��ps9��o�C8o�=Ùd�V{\��E�賨P#g�u�;�am����Z��v���Vj4 %�糯�fP�������3�c_���o��uw��G8��B�lm�e%|S���b�Q�l�mgi'�hSe�����>����6������m�ٍM�Lљ<~Ѐ$�oh�D���i&�[�5	km^8��j˓.�A��B�v�1�Q�m�Ѣ����)�t�H��恪����SU���Py�
��PDȯ�~M���x6�Vz�UZ��8m(���V��OѲ���
�AfEzG+�H]%�Mu��e�F��{���u�x�
F~����{����O3qv;=3�ܾ4�L�r-��FI�n#m��Oq�f���j=���������ߏۻ��!
A�y�C�R����YF.cJNW���{�bI�:�̰��)qz =_�Y�O]]Zӵ�1�߯B�I)QP�9Ϳ�����\�J���Z(D�A�w/H�b`&V�S�}�Lc|
���0�i���.���[�	$kf1��O3R�5�z�������n$������>�:.w����<A]R��tn�@	4���4u���X�4z��;���y�*��;��1�g�u�9���L�J�r؉�_E�ϭ��~Ia2�s���%�������v=�?��C����Ly�#�7מXj�Q,Ϫ�l�n������cg3
�\yr��1F@@F]���! A�ĺ��iZ����6ℯ�}�L��L��2����2/�7v~I3i2k�X8���G1ϩ*C��=a��`ԙ	�i��fTw�+��́��H��Dők��Fj�;�c�~�|�������3�0���>��R_W�D���:��K���i�}���� ����      �   $   x�3�4�2�4�2҆`ڔ��6����=... Up      �   "   x�3�4TH�H,���2 ژ�.���� ��      �   "   x�3�4�ru�wtvvqu����� T��      �      x������ � �      �   /  x���]k�0���_�^��r���>,��Bz�2�2(�ƣ�Rh��$���9mb[�z�A1����Kǈe��Н	���/PI�Q����ͥ؞�"��~˦o�S���sLD�.s"UV|�; ��EC��.!�"UN,�2?R$��?�T����׭\���l��m��\���Q�*pH��T�T!��dA9���^ڄ��;�5�V���*O�tT��/G�V��&���N�ھ���}�����h��@�}�g��	��=A���F\�Y�Ms[b�kͫJQL��Rs�5xf M$Jix��Sm�b��dHFE���ycr�_��Y����?��~�7�Y�ȝ�����<{ϗC��������`ޝ��lL��q�4��f"j��I������u?fb𼥢5Ps�m,R�j�z~*DK�Cq�SY޿=��k�vO(?!�"p:�3�0-I��݈�v���yUش�����v�������_�e�[$�`M!���,+�v�%��Ξ�?��wbZHL�N�*��<���v��n��5-��A��~�f��H�TU���I      �   �
  x��Y[o�H}n��Jy�|���J�4��Հ�$h$���`wC�̯�r���Ӱ� �\�U�N�ckHp��^ް�r�����[�ߒ߆����o���o�m>���wL��F�.ԯi�-����s9�͏-�1�v��,��n��r4��S:-�ר"K�P��c�@_4ݫ+�MYE��{l���-�6.�A�e�OrЋ9s����Pwg��.�6��fR�SQF�����rUа9��W��վ��7�0��̕����T3�X���c#mkK2�g��޹��(���9�z����g����9>B��������Wy��Ks�{G�'%�I��5g�Qt:[���jj�Q˟���w�����y�����b��ܾy�,ۍv3�����Qov��������F��8��������"Bc�;8O�8�Ј�W{<b�,��M0��O�h�ޜ{}�r:�\EQ��|1��M��E���ߏ���$	ե�ȣm��A���j,Lc �[ͯƁ�2��shq���p�Ň&���a[�MTc!)�@G�<��1R�8�A$�8��;3�:���f�f:]������[f�P`�-p�4$1��fYL��:3?9�agL^���k��l������$4M��G)���,�lKğ���聸��\Irw���'x�pZ��,��yJD�YFX��j�a(�bȆT1$���gQa+h@D��*�o+��Wa�ݪػɫ*`�4Ɛ�NL�
A�9����Qk~�L����ByYG$��C�ן���h����j��I�W�?W��a{��C]~]f�m��c��p��<�)a�D�Y��YJC��l�����f�y
���f_Rn�i��0b��$�4`�W�(@ܕMI�fE��Q��O#X�4S�,�b�hJ
����PM0�\��"Xx���C��Ëb���@�����Fq��L3!1�eJ���ʓ�i��r%T[����j����W�@
i��Gq��i�/|/��D���k>���zœΰ���ӡՖUE5+\��%���C�,BR�;'��iG�J����QT�0%C�+����S��C�[Rm	�Ї@'��Fyh��a�׍�rk�)�%�#'0S~�-�����\��]���Z����fuu�*3Œn�ɨ�""���a��R[�U�8W��1X���Ҟ:�=�/�ڦ�[F�T`�1�]�|O�ˈf�.���k��}Y_��1K
��V�1�L�����Gwm��EMoqG4ڳ� ��T��NS�J���_����W�0�PZ��۸!z���4���I��L���f	� P@Q�Z���ӿ1tW��q�9�c�F�)�6�j�4u��4Ј��~+� �
�3��j<�~�I�RVzތ�z�eJ�j�#A�)az`���CNS�V�yQ�VM�W���	���	;Ϗ�)K���`�~���~M$i&8ۂ���K��4� ��5�^�{����+z�XY7���y�;$��8X(�ć��`��mS����c��	��d�w����ʶ�KB�®��9��tO-u ���G!H<X4\j��S�\�n��wU �A�R�T=�ZJ��0��a��mh7�����v�2à�7���u␒\2��:�X����޼�oc~]��ұ0޴k���L�񳥢F�0�Ѐ2X�?��r1�+���Y� ��N��n���T�'��R>#�OA̯a����ck�i�p�Mu���}�&�Y�,�b�������W~TJZ��F�2r������v#}�@Mq��_�o���G� `��q�.���|�)�ΗN�e�n<l�������)�Y�R�1�� �/�4���76��x7���i쇛���R$Y���eA��E�ʗ�Ǜ��ޡr�SFM�>l����3?�b�Z(@^�[/Z��,?ur����I�I�2Ͻ�6<���ӧ7uSQd]���>4����iLRUF#c?��t���Sk}��~�x��h��o�ϰ?�90�b�>�7y\��&��iغ��E��t��.i��V��tp��99P?�?�q.�C6wËXv���(�שYE�oP�� L�z��dS�?L9��~m�3�� mu{��zYR�j�r�P�i��E�'�����l.������
��IV���u�����
2%dX�*9#�D�!��F:}�ݰ7j��|������u:J�Y5���1R��<؃)C�Ô�'��JU�rjk<2p{��]���(����W4��L@��\�ҭ�QS���"��P��}��*/?�I{}�K��˺��0�m���Š�H$`/yZm�uiZ�{]P��麳^����_²��fUl�GUf*(�x�ո�>ݭ�]G��'m+M�篯Ȇ��VE�$T+`���7z]�����;�C��ꧧf���//������{ʒ��T�"��`r�
у]B�F-���C�k��{�
��Z���m
\�K�� j�� ^ދl�5 0*o�<ˈ����h^��"�֪y�z5����h&ȉBn�5�Q-Ms�a�Q� _��wm�Ǵ��]i%���U��A���T0Z�8��6��r��2��'"�r�=(���X�dm1��I��~j����,�����=�!؈ߣ	g����9�v�4�����?�iئ.CD���0���bt�&Õ�����]똧Ug=y��e��u�P��z����i���Ac<j7H�u/�� ��V*��  ��     