class Configdb:
    """Clase de configuración para la base de datos PostgreSQL y otros parámetros"""


    #supabase
    DB_USER = 'postgres'  
    DB_PASSWORD = 'c7NTwXs8mhAVYmMv' 
    DB_HOST = 'db.gqcapgrvtmdnwinaqlnk.supabase.co'  
    DB_PORT = 5432
    DB_NAME = 'postgres'

     #railway
    DB_USER = 'postgres'  
    DB_PASSWORD = 'fJSsqIRzZTftGzquvfWwIfMWHlmIsIvH' 
    DB_HOST = 'junction.proxy.rlwy.net'  
    DB_PORT = 12235  
    DB_NAME = 'railway'


    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FLASK_ENV = 'development'  
    DEBUG = True 