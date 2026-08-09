import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readSimpleCsv(relativePath, expectedColumns){
  const content = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/^\uFEFF/, '').trim();
  const lines = content.split(/\r?\n/);
  const columns = lines[0].split(',');
  if(columns.join(',') !== expectedColumns.join(',')){
    throw new Error(`${relativePath}: encabezados inválidos`);
  }

  return lines.slice(1).filter(Boolean).map((line,index) => {
    const values = line.split(',');
    if(values.length !== columns.length){
      throw new Error(`${relativePath}:${index + 2}: se esperaban ${columns.length} columnas y hay ${values.length}`);
    }
    return Object.fromEntries(columns.map((column,i) => [column, values[i].trim()]));
  });
}

const products = readSimpleCsv('data/productos.csv', [
  'id','nombre_normalizado','categoria','subcategoria','unidad_base','activo'
]);
const synonyms = readSimpleCsv('data/sinonimos.csv', [
  'sinonimo','producto_id','prioridad'
]);
const offers = readSimpleCsv('data/ofertas_supermercados.csv', [
  'supermercado','sku','nombre_publicado','producto_id','marca','cantidad_presentacion',
  'unidad','precio_gtq','disponible','sucursal_id','fecha_captura','fuente_url'
]);

const productIds = new Set();
for(const product of products){
  if(!product.id || !product.nombre_normalizado || !product.categoria || !product.unidad_base){
    throw new Error(`Producto incompleto: ${JSON.stringify(product)}`);
  }
  if(productIds.has(product.id)) throw new Error(`ID de producto duplicado: ${product.id}`);
  productIds.add(product.id);
}

const synonymKeys = new Set();
for(const synonym of synonyms){
  const key = synonym.sinonimo.toLocaleLowerCase('es-GT');
  if(synonymKeys.has(key)) throw new Error(`Sinónimo duplicado: ${synonym.sinonimo}`);
  if(!productIds.has(synonym.producto_id)){
    throw new Error(`Sinónimo sin producto válido: ${synonym.sinonimo} -> ${synonym.producto_id}`);
  }
  if(!/^\d+$/.test(synonym.prioridad)) throw new Error(`Prioridad inválida: ${synonym.sinonimo}`);
  synonymKeys.add(key);
}

for(const offer of offers){
  if(!productIds.has(offer.producto_id)) throw new Error(`Oferta sin producto válido: ${offer.sku}`);
  if(offer.precio_gtq && !/^\d+(?:\.\d{1,2})?$/.test(offer.precio_gtq)){
    throw new Error(`Precio inválido en oferta: ${offer.sku}`);
  }
}

console.log(`Catálogo válido: ${products.length} productos, ${synonyms.length} sinónimos y ${offers.length} ofertas.`);
