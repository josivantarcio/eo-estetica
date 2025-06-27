# Configuração do PostgreSQL

## Passos para migrar para PostgreSQL:

### 1. Instalar PostgreSQL
- Baixe e instale o PostgreSQL: https://www.postgresql.org/download/windows/
- Durante a instalação, defina uma senha para o usuário `postgres`
- Anote a porta (padrão: 5432)

### 2. Criar o banco de dados
Abra o pgAdmin ou psql e execute:
```sql
CREATE DATABASE clinica_estetica;
```

### 3. Configurar a URL do banco
No arquivo `.env.local`, atualize a `DATABASE_URL` com suas credenciais:
```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/clinica_estetica?schema=public"
```

### 4. Executar as migrações
```bash
npx prisma db push
```

### 5. Gerar o cliente Prisma
```bash
npx prisma generate
```

### 6. (Opcional) Visualizar o banco
```bash
npx prisma studio
```

## Alterações realizadas:

✅ Schema atualizado para PostgreSQL
✅ Enums adicionados (Role, StatusAgendamento, TipoComissao, StatusPagamento)
✅ Driver pg instalado
✅ DATABASE_URL configurada no .env.local

## Próximos passos:
1. Configure o PostgreSQL na sua máquina
2. Atualize a DATABASE_URL com suas credenciais
3. Execute `npx prisma db push` para criar as tabelas
4. Execute `npx prisma generate` para gerar o cliente

## Vantagens do PostgreSQL:
- Melhor performance para aplicações em produção
- Suporte a tipos de dados mais avançados
- Melhor suporte a transações
- Escalabilidade superior
- Enums nativos