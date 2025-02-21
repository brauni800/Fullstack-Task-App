import psycopg2
import uuid
from faker import Faker
from datetime import datetime, timedelta

# Configura Faker para generar datos aleatorios
fake = Faker()

# Conexión a la base de datos PostgreSQL
conn = psycopg2.connect(
    dbname="",
    user="",
    password="",
    host="localhost",
    port="5432",
)

cursor = conn.cursor()

# ID del usuario fijo para todas las tareas
USER_ID = "9debf1fd-8f95-46f9-91ae-4658e866b38e"

# Lista de prioridades posibles
PRIORITIES = ["Low", "Medium", "High"]

# Generar 1000 tareas aleatorias
tasks = []
for _ in range(1000):
    task_id = str(uuid.uuid4())
    title = fake.sentence(nb_words=6)
    description = fake.paragraph(nb_sentences=3)
    completed = fake.boolean()
    priority = fake.random.choice(PRIORITIES)
    due_date = fake.date_time_between(start_date="now", end_date="+60d")
    created_at = datetime.now()

    tasks.append(
        (
            task_id,
            USER_ID,
            title,
            description,
            completed,
            priority,
            due_date,
            created_at,
        )
    )

# Insertar las tareas en la base de datos
query = """
INSERT INTO task (id, user_id, title, description, completed, priority, due_date, created_at)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
"""

cursor.executemany(query, tasks)
conn.commit()

# Cerrar conexión
cursor.close()
conn.close()

print("✅ 1000 tareas insertadas exitosamente en la base de datos.")
