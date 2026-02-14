package br.tiagolopes.service;

import br.tiagolopes.dto.ProductionItemDTO;
import br.tiagolopes.dto.ProductionPlanDTO;
import br.tiagolopes.model.Product;
import br.tiagolopes.model.ProductComposition;
import br.tiagolopes.model.RawMaterial;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductionService {
    public ProductionPlanDTO calculateProductionPlan() {
        Map<Long, Integer> virtualStock = RawMaterial.listAll().stream()
            .map(entity -> (RawMaterial) entity)
            .collect(Collectors.toMap(r -> r.id, r -> r.stockQuantity));

        List<Product> products = Product.list("ORDER BY price DESC");

        List<ProductionItemDTO> plannedItems = new ArrayList<>();
        double totalValue = 0.0;
        int totalItems = 0;

        for (Product product : products) {
            int quantityCanProduce = 0;

            while (true) {
                if (canProduce(product, virtualStock)) {
                    deductStock(product, virtualStock);
                    quantityCanProduce++;
                } else {
                    break;
                }
            }

            if (quantityCanProduce > 0) {
                double subTotal = quantityCanProduce * product.price;
                totalValue += subTotal;
                totalItems += quantityCanProduce;

                plannedItems.add(new ProductionItemDTO(
                    product.name,
                    quantityCanProduce,
                    product.price,
                    subTotal
                ));
            }
        }

        return new ProductionPlanDTO(plannedItems, totalValue, totalItems);
    }

    private boolean canProduce(Product product, Map<Long, Integer> stock) {
        if (product.composition == null || product.composition.isEmpty()) {
            return false;
        }

        for (ProductComposition item : product.composition) {
            Long materialId = item.rawMaterial.id;
            Integer required = item.quantityRequired;
            Integer available = stock.getOrDefault(materialId, 0);

            if (available < required) {
                return false;
            }
        }
        return true;
    }

    private void deductStock(Product product, Map<Long, Integer> stock) {
        for (ProductComposition item : product.composition) {
            Long materialId = item.rawMaterial.id;
            stock.compute(materialId, (k, currentStock) ->
                (currentStock != null ? currentStock : 0) - item.quantityRequired
            );
        }
    }
}
