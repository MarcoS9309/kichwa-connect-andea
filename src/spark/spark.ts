// Shim mínimo para reemplazar "@github/spark/spark".
// Permite que el proyecto funcione sin la dependencia externa.
export function initializeSpark() {
  // Podemos realizar configuraciones globales aquí si fuese necesario.
  // Por ahora, es un no-op.
}

// Auto-invocar para mantener compatibilidad con `import "@github/spark/spark"`.
initializeSpark()
