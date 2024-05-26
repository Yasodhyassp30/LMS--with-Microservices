from py_eureka_client.eureka_client import EurekaClient

eureka_client = EurekaClient(
    eureka_server="http://localhost:8761/eureka/",
    app_name="quiz-service",
    instance_port=8000,
    instance_ip="127.0.0.1",
    instance_id="quiz-service-127.0.0.1:8000",
)

# Start the client
eureka_client.start()
