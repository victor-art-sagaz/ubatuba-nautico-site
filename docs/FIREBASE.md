# Ativando a gravação de reservas (Firebase)

A demonstração funciona **sem** Firebase. Este guia descreve como ligar a gravação de reservas de forma segura quando a empresa real estiver pronta.

## Princípios

- O navegador **nunca** lê nem grava em `bookingRequests` (as regras em `firestore.rules` bloqueiam).
- A gravação passa por uma **Cloud Function** (Admin SDK), que valida os campos, limita abusos e só então grava.
- Nenhuma credencial de servidor vai para o frontend. As variáveis `VITE_FIREBASE_*` são apenas a configuração pública do app web.

## Passos

1. Crie um projeto no Firebase e ative o Firestore (modo produção).
2. Publique as regras: `firebase deploy --only firestore:rules`.
3. Crie uma Cloud Function HTTPS que receba o JSON enviado por `src/services/bookings.ts` (campos: `name`, `phone`, `experienceId`, `experienceName`, `date`, `period`, `passengers`, `notes`, `source`).
4. Na função: valide tipos, tamanhos e valores permitidos (repita as regras de `src/lib/validation.ts`), recuse campos extras, aplique limite de requisições por IP e, se possível, exija **Firebase App Check**.
5. Responda `2xx` somente depois de gravar. O site só exibe "registrado" nesse caso.
6. Defina `VITE_BOOKING_API_URL` com a URL HTTPS da função e restrinja o CORS ao domínio do site.
7. Atualize a Política de Privacidade (prazo de retenção, finalidade, contato do responsável).

## Esqueleto de exemplo (não testado, apenas referência)

```ts
// functions/src/index.ts
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

initializeApp()

export const createBookingRequest = onRequest(
  { cors: ['https://SEU-DOMINIO'], maxInstances: 5 },
  async (req, res) => {
    if (req.method !== 'POST') return void res.status(405).end()

    const b = req.body ?? {}
    const ok =
      typeof b.name === 'string' && b.name.length >= 3 && b.name.length <= 80 &&
      typeof b.phone === 'string' && b.phone.length <= 20 &&
      typeof b.experienceId === 'string' && b.experienceId.length <= 60 &&
      /^\d{4}-\d{2}-\d{2}$/.test(b.date) &&
      Number.isInteger(b.passengers) && b.passengers >= 1 && b.passengers <= 50 &&
      (b.notes === undefined || (typeof b.notes === 'string' && b.notes.length <= 500))

    if (!ok) return void res.status(400).json({ error: 'invalid' })

    await getFirestore().collection('bookingRequests').add({
      name: b.name, phone: b.phone, experienceId: b.experienceId,
      date: b.date, period: String(b.period), passengers: b.passengers,
      notes: b.notes ?? '', status: 'pending', createdAt: FieldValue.serverTimestamp(),
    })
    res.status(201).json({ ok: true })
  },
)
```

Acrescente verificação de App Check, limite por IP e lista fechada de `experienceId`/`period` antes de usar em produção.
