# Paquete iconográfico semirrealista de categorías

Colección local de 16 ilustraciones WebP con fondo transparente para productos
sin fotografía propia. La aplicación almacena solamente el nombre de la categoría
y carga estos archivos estáticos; las imágenes no se guardan en la base de datos.

Archivos disponibles:

- `generic.webp`: compras o producto desconocido
- `dairy.webp`: lácteos
- `bakery.webp`: panadería
- `sweets-snacks.webp`: dulces y snacks
- `meat.webp`: carnes
- `produce.webp`: frutas y verduras
- `beverages.webp`: bebidas
- `pantry.webp`: despensa
- `cleaning.webp`: limpieza
- `household-paper.webp`: hogar y papel
- `frozen.webp`: congelados
- `personal-care.webp`: cuidado personal
- `baby.webp`: bebé
- `pets.webp`: mascotas
- `pharmacy.webp`: farmacia
- `eggs.webp`: huevos

La lámina original y su versión transparente se conservan junto al paquete para
facilitar futuras ampliaciones con el mismo estilo. El SVG anterior se mantiene
como referencia histórica, pero la interfaz utiliza las ilustraciones WebP.

## Regla para categorías nuevas

Toda categoría nueva debe incorporarse junto con una ilustración semirrealista
WebP de fondo transparente, coherente con este paquete, y su correspondencia en
`categoryIconFile()` dentro de `index.html`. Hasta que ese recurso exista, la
aplicación debe utilizar `generic.webp` para evitar imágenes rotas; el ícono
genérico es solamente un respaldo temporal, no el resultado definitivo.
