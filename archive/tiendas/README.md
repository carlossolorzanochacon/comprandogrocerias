# Archivo histórico — módulo TIENDAS

Este directorio conserva la especificación completa del módulo **TIENDAS** retirado de la navegación principal al unificarse con **LISTA**.

## Copia íntegra restaurable

La última versión completa está guardada en el commit local:

`b48b5a3 Mejora comparación y vista de precios por tienda`

Para consultar cualquier archivo sin alterar el proyecto:

```text
git show b48b5a3:index.html
git show b48b5a3:selected-design.css
git show b48b5a3:sw.js
```

Este punto de restauración contiene el HTML, CSS, JavaScript, comportamiento, diagramación y vínculos exactos a los recursos gráficos de TIENDAS.

## Diseño conservado

- Encabezado compacto “Comparar tiendas”.
- Resumen de cantidad de productos.
- Guía para ingresar precios manualmente.
- Agrupación en el mismo orden de categorías de LISTA.
- Ícono único en la barra de cada categoría.
- Dos columnas de precio: Walmart y La Torre.
- Cálculo por cantidad de presentaciones necesarias.
- Totales independientes por supermercado.
- Indicadores de menor precio y mayor disponibilidad.
- Panel de totales fijo sobre la navegación inferior.
- Registro de precios en HISTORIAL.
- Registro de compra por tienda, fecha y selección de productos.
- Alimentación de FRECUENTES mediante compras confirmadas.
- Persistencia local en `smartManualStorePrices`, `smartPriceHistory` y `smartPurchases`.

## Recursos gráficos preservados

Los recursos permanecen en el proyecto y no deben eliminarse:

- `assets/stores/walmart.webp`
- `assets/stores/walmart-cropped.webp`
- `assets/stores/la-torre.webp`
- `assets/category-icons/semirealistic/`
- `assets/branding/`

## Datos del usuario

La unificación no elimina `smartManualStorePrices` ni los registros históricos de Walmart y La Torre. El módulo nuevo utiliza almacenamiento adicional y mantiene los datos anteriores disponibles para una restauración o migración futura.

## Motivo del retiro

LISTA y TIENDAS duplicaban la representación de los mismos productos. La nueva LISTA integra captura, organización, recolección, cantidades, precio único, subtotales, total general y cierre de compra en una sola vista.
