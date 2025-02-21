# 📝 Task Manager - Proyecto Fullstack (FastAPI + Next.js)

## **📌 1. Requisitos previos**  

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:

🔹 **Docker** (Opcional, pero recomendado)  
🔹 **Python 3.10+**  
🔹 **Node.js 18+ y npm**  
🔹 **PostgreSQL**  
🔹 **Conda** (Para manejar dependencias en Python)  

```sh
conda create --name task-manager-env python=3.10
conda activate task-manager-env
```

---

## **🚀 2. Iniciar el Backend (FastAPI)**  

1️⃣ **Clona este repositorio**  
```sh
git clone https://github.com/tu-repo/task-manager.git
cd task-manager/backend
```

2️⃣ **Instala las dependencias con Conda**  
```sh
pip install -r requirements.txt
```

3️⃣ **Configura la base de datos en `.env`**  
📌 **Crea un archivo `.env` dentro de `backend/` y añade:**  
```ini
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/taskdb
SECRET_KEY=supersecreto
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4️⃣ **Crea la base de datos y aplica migraciones**  
```sh
alembic upgrade head
```

5️⃣ **Inicia el servidor FastAPI**  
```sh
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

📌 La API estará disponible en: **`http://localhost:8000`**  
📌 Documentación de Swagger: **`http://localhost:8000/docs`**  

---

## **🖥️ 3. Iniciar el Frontend (Next.js con App Router)**  

1️⃣ **Ir a la carpeta del frontend**  
```sh
cd ../frontend
```

2️⃣ **Instalar dependencias**  
```sh
npm install
```

3️⃣ **Configurar variables de entorno**  
📌 **Crea un archivo `.env.local` en `frontend/` con:**  
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4️⃣ **Iniciar el frontend**  
```sh
npm run dev
```

📌 La aplicación estará disponible en: **`http://localhost:3000`**  

---

## **✅ 4. Tareas a Completar Durante la Entrevista**  

Durante la entrevista, se te pedirá completar algunas de las siguientes tareas para evaluar tu capacidad técnica:

| **Tarea** | **Descripción** | **Dificultad** |
|-----------|---------------|---------------|
| 🔹 **Filtrar tareas por estado y prioridad** | Agregar opciones para filtrar tareas en el frontend y modificar la API en el backend. | 🟡 Medio |
| 🔹 **Agregar validaciones con Pydantic** | Implementar validaciones en FastAPI para mejorar la seguridad de la API. | 🟡 Medio |
| 🔹 **Agregar registro de usuarios (`/register`)** | Crear un formulario en el frontend y un endpoint en el backend para que nuevos usuarios puedan registrarse. | 🔴 Difícil |
| 🔹 **Paginación de tareas** | Implementar paginación en el backend y frontend para manejar muchas tareas eficientemente. | 🔴 Difícil |

📌 Durante la prueba, **elige una o más tareas** y explícanos tu proceso de pensamiento mientras codificas.  

---

## **📊 5. Criterios de Evaluación**  

Los candidatos serán evaluados con base en:  

✅ **Estructura del código** - Separación lógica entre backend y frontend.  
✅ **Correcto uso de frameworks** - FastAPI (backend) y Next.js (frontend).  
✅ **Optimización del código** - Código limpio y reutilizable.  
✅ **Manejo de estado** - Uso correcto de React Context, React Query o Zustand.  
✅ **Buen manejo de la base de datos** - Uso eficiente de SQLAlchemy y PostgreSQL.  
✅ **Seguridad y validaciones** - Correcto manejo de autenticación y permisos.  

---

## **👨‍💻 Autor**
**Task Manager Fullstack Interview Challenge** 
