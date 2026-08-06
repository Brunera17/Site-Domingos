// Utilitários compartilhados pelas funções de e-mail (api/contato.js e api/trabalhe-conosco.js)

export function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

/**
 * Envolve o conteúdo em um layout de e-mail com a identidade visual do site
 * (fundo escuro, destaque laranja). `bodyHtml` já deve vir com o HTML escapado.
 */
export function renderEmailShell({ title, preheader = '', bodyHtml }) {
    return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Inter,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#141414;border:1px solid #262626;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#E8610A;padding:20px 28px;">
                <span style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Domingos Assessoria Empresarial</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px;">
                <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:0 0 20px;">${escapeHtml(title)}</h1>
                <div style="color:#d4d4d4;font-size:14px;line-height:1.6;">
                  ${bodyHtml}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;border-top:1px solid #262626;">
                <p style="color:#737373;font-size:12px;margin:0;">
                  Av. Antônio Justino Viera, 350 — Jardim Planalto, Itaí/SP · (14) 9 9658-0459
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function fieldRow(label, value) {
    return `<p style="margin:0 0 12px;"><strong style="color:#ffffff;">${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
}
