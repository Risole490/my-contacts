export default function formatPhone(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/^(\d{2})\B/, '($1) ') // Formata o DDD
    .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3'); // Formata o número
}

// \d = 0123456789
