import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 1. Inicializar Firebase con el archivo de credenciales
cred = credentials.Certificate("credenciales.json")
firebase_admin.initialize_app(cred)

# 2. Obtener cliente de Firestore
db = firestore.client()

# 3. Ruta a la carpeta que contiene tus archivos JSON
ruta_carpeta = "PREGUNTAS"

print("🚀 Iniciando proceso de migración masiva a Firestore...\n")

# Verificamos si la carpeta existe
if not os.path.exists(ruta_carpeta):
    print(f"❌ Error: No se encontró la carpeta '{ruta_carpeta}'. Verifica la ruta.")
    exit()

# 4. Recorrer todos los archivos dentro de la carpeta
for nombre_archivo in os.listdir(ruta_carpeta):
    # Solo procesamos archivos que terminen en .json
    if nombre_archivo.endswith(".json"):
        ruta_completa = os.path.join(ruta_carpeta, nombre_archivo)
        
        # El ID del deporte será el nombre del archivo sin el '.json' (ej: 'ajedrez', 'basquet')
        id_deporte = os.path.splitext(nombre_archivo)[0]
        
        print(f"📦 Procesando reglamento de: {id_deporte.upper()}")
        
        # Leer el contenido del archivo JSON
        with open(ruta_completa, "r", encoding="utf-8") as archivo:
            try:
                lista_preguntas = json.load(archivo)
            except json.JSONDecodeError:
                print(f"  ❌ Error: El archivo {nombre_archivo} no tiene un formato JSON válido. Saltando...")
                continue
        
        # 5. Subir cada una de las preguntas de la lista
        for item in lista_preguntas:
            # Obtenemos el ID numérico (del 1 al 40)
            id_num = item.get("id")
            if id_num is None:
                print("  ⚠️ Pregunta ignorada: falta el campo 'id'.")
                continue
                
            # Formateamos el ID del documento para que quede ordenado (pregunta_01, pregunta_02... pregunta_40)
            id_pregunta_doc = f"pregunta_{str(id_num).zfill(2)}"
            
            # Definir la referencia de la ruta en Firestore:
            # cuestionarios -> [id_deporte] -> preguntas -> [pregunta_XX]
            ref_pregunta = db.collection("cuestionarios").document(id_deporte).collection("preguntas").document(id_pregunta_doc)
            
            # Guardar el objeto completo en la base de datos
            ref_pregunta.set(item)
            
        print(f"  ✅ ¡Éxito! Se subieron las {len(lista_preguntas)} preguntas de {id_deporte}.\n")

print("🎉 ¡Proceso terminado! Todos los reglamentos han sido subidos con éxito a Cloud Firestore.")