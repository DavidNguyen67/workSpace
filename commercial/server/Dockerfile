FROM quay.io/keycloak/keycloak:latest as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=mysql

WORKDIR /opt/keycloak
# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# change these values to point to a running mysql instance
ENV KC_DB=mysql
ENV KC_DB_URL=database-1.cnomy8wa8sk3.us-east-1.rds.amazonaws.com:3306/awsdatabase
ENV KC_DB_USERNAME=davidnguyen67dev
ENV KC_DB_PASSWORD=1610a56d-8662-48ca-aa81-ce5f5b3fe657
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]