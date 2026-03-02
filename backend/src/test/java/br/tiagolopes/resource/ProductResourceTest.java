package br.tiagolopes.resource;

import br.tiagolopes.model.Product;
import br.tiagolopes.model.ProductComposition;
import br.tiagolopes.model.RawMaterial;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
public class ProductResourceTest {
    @BeforeEach
    @Transactional
    public void cleanUp() {
        ProductComposition.deleteAll();
        Product.deleteAll();
        RawMaterial.deleteAll();
    }

    @Test
    public void testCreateProductWithComposition_Success() {
        String materialJson = """
            {
                "name": "Chocolate",
                "stockQuantity": 500,
                "unit": "G"
            }
        """;

        Integer materialId = given()
            .contentType(ContentType.JSON)
            .body(materialJson)
            .when()
            .post("/raw-materials")
            .then()
            .statusCode(201)
            .extract().path("id");

        String productJson = """
            {
                "name": "Barra de Chocolate",
                "price": 15.50,
                "composition": [
                    {
                        "rawMaterialId": %d,
                        "quantityRequired": 250
                    }
                ]
            }
        """.formatted(materialId);

        given()
            .contentType(ContentType.JSON)
            .body(productJson)
            .when()
            .post("/products")
            .then()
            .statusCode(201)
            .body("id", notNullValue())
            .body("name", is("Barra de Chocolate"))
            .body("composition[0].quantityRequired", is(250.0f))
            .body("composition[0].rawMaterial.name", is("Chocolate"));
    }
}
