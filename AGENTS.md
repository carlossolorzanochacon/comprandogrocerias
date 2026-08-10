# AGENTS.md — comprandogrocerias

## 1. Nombre y propósito del proyecto

Nombre del proyecto: **comprandogrocerias**

Objetivo principal:
Crear una aplicación web móvil, fácil de usar desde teléfono, para que el usuario pueda **dictar o escribir artículos que necesita en casa**, organizar automáticamente esos productos, y comparar el costo total de la compra entre supermercados.

Primera fase de supermercados:
- Walmart Guatemala
- La Torre Guatemala

La arquitectura debe permitir agregar más supermercados en el futuro sin rehacer la aplicación.

---

## 2. Experiencia de usuario deseada

La aplicación debe ser:
- Mobile-first.
- Muy fácil de usar desde teléfono.
- Botones grandes.
- Acciones claras y visibles.
- No demasiado minimalista.
- Colores vivos, principalmente:
  - Azul
  - Naranja
  - Verde
- Uso abundante de iconos grandes para distinguir módulos y acciones.
- La interfaz debe sentirse práctica y visual, no corporativa ni austera.

El usuario prefiere evitar pasos manuales repetitivos. Para desarrollo:
- NO hacer que el usuario descargue/suba archivos repetidamente.
- NO pedirle copiar prompts entre herramientas salvo que sea absolutamente inevitable.
- El flujo ideal es:
  **Codex local → GitHub → Netlify → usuario prueba**
- Netlify ya está conectado a GitHub y despliega automáticamente desde `main`.

---

## 3. Funcionalidad principal

### 3.1 Captura de artículos
Debe permitir:
- Escribir productos.
- Dictar productos por voz.
- Hablar de forma natural.
- Interpretar cantidades, marcas, presentaciones y categorías.

Ejemplos de lenguaje natural:
- “2 leches descremadas”
- “cereal Corn Flakes grande”
- “6 aguacates”
- “detergente Ariel 3 kg”
- “Coca-Cola Zero de 2.5 litros”

La aplicación debe convertir lo dictado/escrito en una lista estructurada.

---

## 4. Organización de productos

Cada producto deberá evolucionar hacia un modelo con:
- Nombre normalizado
- Cantidad
- Marca
- Presentación / tamaño
- Unidad
- Categoría
- Preferencia de sustitución
- Restricciones obligatorias
- Equivalencias válidas

Ejemplo:
“Ariel grande” no debe tratarse como simple texto.
La lógica futura deberá entender:
- marca = Ariel
- producto = detergente
- presentación aproximada = grande
- equivalencias posibles según tamaño/precio por unidad

---

## 5. Comparación de supermercados

Primera fase:
- Walmart Guatemala
- La Torre Guatemala

La comparación NO debe limitarse a precios individuales.

Debe calcular:
1. Compra 100% Walmart
2. Compra 100% La Torre
3. Compra óptima combinada

Métricas:
- Total de la carreta
- Productos disponibles
- Productos faltantes
- Sustituciones necesarias
- Diferencia de precio
- Precio por unidad / volumen cuando aplique
- Ahorro total
- Conveniencia de dividir compra entre tiendas

La “Compra Óptima” solo debe recomendar dividir la compra si el ahorro justifica ir a dos supermercados.

Nunca inventar:
- Precios
- Existencias
- Equivalencias no verificadas

---

## 6. Ubicación

La web debe manejar ubicación de dos formas simultáneas:

### Dirección escrita
Campo de dirección exacta.

Debe haber botón visible:
**Guardar dirección y buscar en mapa**

Al guardar:
- Confirmar visualmente que la dirección quedó guardada.
- Intentar localizarla automáticamente en el mapa.

### Mapa
El mapa debe aparecer inmediatamente debajo del campo de dirección.

Flujo:
1. Usuario escribe dirección.
2. Guarda dirección.
3. Se intenta geocodificar.
4. Se muestra pin.
5. Si el pin es incorrecto:
   - botón **Buscar manualmente mi ubicación**
   - el usuario toca el mapa para definir la posición exacta.
6. Alternativa:
   - botón **Usar ubicación actual del teléfono**

Guardar:
- Dirección
- Latitud
- Longitud
- Fuente de la ubicación

La ubicación se usará luego para elegir supermercados/sucursales cercanas.

Mapa actual:
- Leaflet
- OpenStreetMap
- Geocodificación con Nominatim
- Se corrigió un problema de mosaicos desalineados en móvil usando Leaflet 1.9.4 desde jsDelivr e `invalidateSize()`.

---

## 7. Dictado por voz — BUG ACTUAL PRIORITARIO

El dictado funciona bajo HTTPS en Chrome Android, pero hay un bug importante de duplicación.

Ejemplos observados reales:
- Usuario dice una vez: `huevos`
- Resultado: `huevos huevos`

En una sesión con varias palabras, Chrome puede reenviar resultados anteriores y producir algo parecido a:
`huevos leche leche detergente leche detergente dulces leche detergente dulces chocolates`

La causa está en el tratamiento de:
- `SpeechRecognition`
- `webkitSpeechRecognition`
- `interimResults`
- resultados finales que Chrome Android puede volver a emitir o entregar como fragmentos acumulativos

No hacer un parche específico para palabras.

Requisito:
- Los interim deben ser visuales/provisionales.
- Nunca deben quedar acumulados como finales.
- Cada resultado final debe incorporarse exactamente una vez.
- Debe resistir resultados repetidos, acumulativos o históricos de la misma sesión.
- Si hay texto preexistente en el textarea antes de dictar, debe preservarse una sola vez.
- Al comenzar una nueva sesión, no debe volver a insertar dictados anteriores.

Este es el bug funcional inmediato a resolver antes de continuar con funciones más complejas.

---

## 8. Permisos de micrófono

Se diagnosticó lo siguiente:

HTML local (`content://downloads/...`) no era adecuado para SpeechRecognition.

El sitio se publicó en HTTPS y el dictado ya logra acceder al micrófono.

También se comprobó:
- Chrome tenía permiso de micrófono a nivel Android.
- El sitio necesitaba permiso específico de micrófono en Chrome.
- Una vez habilitado, SpeechRecognition funciona.

No volver a invertir tiempo en permisos Android salvo que aparezca un error nuevo.

---

## 9. Estado actual del frontend

Archivo principal:
`index.html`

Configuración de Netlify:
`netlify.toml`

Frontend actual incluye:
- Header “Mi Carreta Inteligente”
- Módulo agregar artículos
- Dictar
- Agregar a la carreta
- Limpiar texto
- Clasificación básica por categorías
- Carreta local
- Preferencias
- Dirección
- Mapa
- Criterio principal
- Sustituciones
- Módulo provisional de Walmart y La Torre
- Botón analizar compra
- Persistencia básica con localStorage

Diseño:
- Mobile-first
- Azul/naranja/verde
- Botones grandes
- Tarjetas redondeadas
- Iconos grandes

---

## 10. Persistencia actual

Actualmente se usa `localStorage` para:
- Carreta
- Dirección
- Coordenadas
- Criterio
- Sustituciones

Esto está bien para MVP.

Política de conservación local:
- Todos los datos creados por el usuario deben conservarse localmente entre recargas y versiones.
- Ninguna migración puede borrar, sustituir ni volver a sembrar datos existentes.
- No ejecutar limpiezas automáticas de `localStorage`, IndexedDB ni futuros almacenes locales.
- Un restablecimiento total solo puede realizarse cuando el usuario lo pida expresamente y confirme el alcance.
- Las eliminaciones individuales deben responder siempre a una acción deliberada del usuario.
- Recordar que `file://`, Netlify y cada navegador/perfil son orígenes distintos y no comparten automáticamente sus datos locales.

Más adelante se puede evolucionar a backend/base de datos si se requiere:
- sincronización entre dispositivos
- historial permanente
- usuarios
- preferencias personales
- historial de precios

No introducir backend todavía salvo que sea necesario para integración con supermercados.

---

## 11. Git / GitHub / Netlify

Repositorio GitHub:
`https://github.com/carlossolorzanochacon/comprandogrocerias.git`

Repositorio local esperado:
`D:\IA\COMPRANDOGROCERIAS`

Rama:
`main`

Remoto:
`origin/main`

Netlify:
- Sitio existente conectado al repositorio.
- Deploy automático desde GitHub.
- Dominio actual:
  `https://comprandogrocerias.netlify.app`

Política temporal de despliegue:
- Trabajar y probar localmente.
- Se permiten commits locales para conservar avances.
- NO hacer push a `origin/main` ni activar un deploy público sin autorización expresa del usuario.
- Agrupar cambios y publicar solo cuando el usuario indique claramente que desea desplegar.

Flujo requerido:
1. Codex modifica archivos localmente.
2. Revisar diff.
3. Commit descriptivo.
4. Push a `origin/main`.
5. Netlify despliega automáticamente.
6. Usuario prueba desde teléfono.

Evitar volver al flujo ZIP/manual.

---

## 12. Preferencias del usuario durante desarrollo

Muy importante:

- El usuario valora mucho la eficiencia.
- No quiere hacer trabajo doble.
- No quiere actuar como intermediario copiando prompts entre ChatGPT, Codex, GitHub y Netlify.
- Si el trabajo es de desarrollo de software, trabajar directamente en Codex sobre el repositorio.
- Antes de pedir pasos manuales, comprobar si Codex puede hacerlos.
- No pedir capturas continuamente si Codex puede inspeccionar el entorno.
- Avanzar con autonomía razonable.
- Cuando una acción implique modificar código:
  - analizar
  - implementar
  - revisar
  - probar si es posible
  - commit
  - push
- Preguntar solo cuando haya una decisión funcional real que necesite al usuario.

---

## 13. Roadmap inmediato

Orden recomendado:

### Paso 1 — Resolver dictado
Corregir completamente la duplicación de SpeechRecognition en Chrome Android.

Después:
- Commit
- Push
- Esperar deploy Netlify
- Pedir al usuario probar:
  - “huevos”
  - luego una frase corta con varios productos

### Paso 2 — Parser de lista más inteligente
Mejorar interpretación:
- cantidades
- artículos múltiples en una frase
- marcas
- tamaños
- unidades
- categorías

### Paso 3 — Catálogo doméstico
Crear estructura para productos habituales y preferencias:
- marcas preferidas
- sustituciones
- tamaños frecuentes

### Paso 4 — Integración supermercados
Investigar opciones reales para:
- Walmart Guatemala
- La Torre Guatemala

Necesitamos:
- búsqueda de producto
- precio
- presentación
- disponibilidad por tienda/sucursal cuando sea posible

No asumir APIs oficiales si no existen.
Investigar antes de implementar.

### Paso 5 — Motor de comparación
Implementar:
- Walmart total
- La Torre total
- Compra óptima
- existencia
- sustituciones
- ahorro
- recomendación final

### Paso 6 — Historial
Registrar:
- precio por producto
- fecha
- supermercado
- presentación
- sucursal

Esto permitirá monitorear cambios de precio.

---

## 14. Filosofía del producto

La aplicación debe sentirse como una **carreta inteligente personal**.

El usuario no debería tener que pensar como un sistema.

Debe poder decir:
“Necesito leche, huevos, Ariel grande y Coca-Cola Zero”

y la aplicación debe encargarse de:
- entender
- estructurar
- buscar
- comparar
- calcular
- recomendar

La complejidad debe vivir en el sistema, no en la interacción del usuario.

---

## 15. Instrucción para Codex

A partir de este archivo:

1. Trata este documento como contexto persistente del proyecto.
2. No pidas al usuario repetir información contenida aquí.
3. No modifiques decisiones de producto sin razón clara.
4. Antes de cada cambio, inspecciona el código actual.
5. Preserva funciones existentes salvo que sea necesario cambiarlas.
6. Cuando termines cambios de código:
   - revisa diff
   - haz pruebas razonables
   - commit
   - push a `origin/main`
7. Aprovecha que Netlify despliega automáticamente.
8. Prioriza siempre reducir trabajo manual para el usuario.
