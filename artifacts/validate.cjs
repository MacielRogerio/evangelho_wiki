// Verificação atual das rotas e controles. Execute com o servidor local ativo.
import('../scripts/validate-sections.mjs').catch(error=>{console.error(error);process.exitCode=1});
