package br.tiagolopes.service;

import br.tiagolopes.dto.ProductionPlanDTO;
import br.tiagolopes.model.Product;
import br.tiagolopes.model.ProductComposition;
import br.tiagolopes.model.RawMaterial;
import io.quarkus.test.TestTransaction;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
public class ProductionServiceTest {
    @Inject
    ProductionService productionService;

    @Test
    @TestTransaction
    public void testCalculateProductionPlan_ShouldCalculateCorrectly() {
        RawMaterial flour = new RawMaterial();
        flour.name = "Farinha";
        flour.stockQuantity = 1000;
        flour.unit = "G";
        flour.persist();

        RawMaterial egg = new RawMaterial();
        egg.name = "Ovo";
        egg.stockQuantity = 10;
        egg.unit = "UN";
        egg.persist();

        Product simpleCake = new Product();
        simpleCake.name = "Bolo simples";
        simpleCake.price = 12.0;

        ProductComposition simpleCakeComposition1 = new ProductComposition();
        simpleCakeComposition1.product = simpleCake;
        simpleCakeComposition1.rawMaterial = flour;
        simpleCakeComposition1.quantityRequired = 100;

        ProductComposition simpleCakeComposition2 = new ProductComposition();
        simpleCakeComposition2.product = simpleCake;
        simpleCakeComposition2.rawMaterial = egg;
        simpleCakeComposition2.quantityRequired = 2;

        simpleCake.composition.add(simpleCakeComposition1);
        simpleCake.composition.add(simpleCakeComposition2);
        simpleCake.persist();

        ProductionPlanDTO plan = productionService.calculateProductionPlan();

        assertNotNull(plan, "Production plan should not be null.");
        assertEquals(5, plan.totalItems(), "It must produce exactly 5 items.");
        assertEquals(60.0, plan.totalValue(), "The total value should be 60.0.");

        assertEquals("Bolo simples", plan.productionList().get(0).productName());
        assertEquals(5, plan.productionList().get(0).quantityToProduce());
    }

    @Test
    @TestTransaction
    public void testCalculateProductionPlan_ShouldPrioritizeTheMostExpensiveProduct() {
        RawMaterial flour = new RawMaterial();
        flour.name = "Farinha";
        flour.stockQuantity = 1000;
        flour.unit = "G";
        flour.persist();

        RawMaterial egg = new RawMaterial();
        egg.name = "Ovo";
        egg.stockQuantity = 12;
        egg.unit = "UN";
        egg.persist();

        Product simpleCake = new Product();
        simpleCake.name = "Bolo simples";
        simpleCake.price = 12.0;

        ProductComposition simpleCakeComposition1 = new ProductComposition();
        simpleCakeComposition1.product = simpleCake;
        simpleCakeComposition1.rawMaterial = flour;
        simpleCakeComposition1.quantityRequired = 100;

        ProductComposition simpleCakeComposition2 = new ProductComposition();
        simpleCakeComposition2.product = simpleCake;
        simpleCakeComposition2.rawMaterial = egg;
        simpleCakeComposition2.quantityRequired = 2;

        simpleCake.composition.add(simpleCakeComposition1);
        simpleCake.composition.add(simpleCakeComposition2);
        simpleCake.persist();

        Product gourmetCake = new Product();
        gourmetCake.name = "Bolo gourmet";
        gourmetCake.price = 25.0;

        ProductComposition gourmetCakeComposition1 = new ProductComposition();
        gourmetCakeComposition1.product = gourmetCake;
        gourmetCakeComposition1.rawMaterial = flour;
        gourmetCakeComposition1.quantityRequired = 300;

        ProductComposition gourmetCakeComposition2 = new ProductComposition();
        gourmetCakeComposition2.product = gourmetCake;
        gourmetCakeComposition2.rawMaterial = egg;
        gourmetCakeComposition2.quantityRequired = 3;

        gourmetCake.composition.add(gourmetCakeComposition1);
        gourmetCake.composition.add(gourmetCakeComposition2);
        gourmetCake.persist();

        ProductionPlanDTO plan = productionService.calculateProductionPlan();
        System.out.println(plan.productionList().toString());

        assertNotNull(plan, "Production plan should not be null.");
        assertEquals(4, plan.totalItems(), "It must produce exactly 4 items.");
        assertEquals(87.0, plan.totalValue(), "The total value should be 87.0.");

        assertEquals("Bolo gourmet", plan.productionList().get(0).productName());
        assertEquals(3, plan.productionList().get(0).quantityToProduce());
    }
}
