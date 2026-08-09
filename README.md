# Comprandogrocerias

Aplicación web móvil para crear una lista doméstica y comparar la compra entre supermercados de Guatemala.

## Catálogo de productos

La base inicial vive en archivos CSV dentro de `data/`:

- `productos.csv`: una fila por producto doméstico normalizado.
- `sinonimos.csv`: una fila por nombre alternativo y su producto asociado.
- `ofertas_supermercados.csv`: plantilla para datos reales de Walmart, La Torre y futuras tiendas. Empieza vacía para no inventar precios ni existencias.

Reglas de mantenimiento:

1. La primera fila siempre contiene los encabezados.
2. Cada producto tiene un `id` estable; no debe reutilizarse ni cambiarse después de relacionarlo con ofertas.
3. Los sinónimos se guardan en filas distintas, no como una lista separada por comas.
4. La coma separa columnas. No se deben introducir comas dentro de los valores; para detalles adicionales se crean nuevas columnas.
5. Los precios usan punto decimal y no incluyen el símbolo `Q`.
6. Las fechas usan el formato `YYYY-MM-DD`.
7. Toda oferta debe incluir una URL de fuente verificable cuando se incorporen datos reales.

Para validar la base:

```powershell
node scripts/validate-catalog.mjs
```
