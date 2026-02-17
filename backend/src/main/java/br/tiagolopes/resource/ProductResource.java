package br.tiagolopes.resource;

import br.tiagolopes.dto.ProductDTO;
import br.tiagolopes.dto.ProductionPlanDTO;
import br.tiagolopes.model.Product;
import br.tiagolopes.model.ProductComposition;
import br.tiagolopes.model.RawMaterial;
import br.tiagolopes.service.ProductionService;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {
    @Inject
    ProductionService productionService;

    @GET
    public List<Product> list() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Response create(ProductDTO dto) {
        Product product = new Product();
        product.name = dto.name();
        product.price = dto.price();

        addProductComposition(dto, product);

        product.persist();

        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, ProductDTO dto) {
        Product product = Product.findById(id);

        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        product.name = dto.name();
        product.price = dto.price();
        product.composition.clear();

        addProductComposition(dto, product);

        return Response.ok(product).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Product.deleteById(id);

        if (deleted) {
            return Response.noContent().build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("/production-plan")
    public ProductionPlanDTO getProductionPlan() {
        return productionService.calculateProductionPlan();
    }

    private void addProductComposition(ProductDTO dto, Product product) {
        if (dto.composition() != null) {
            dto.composition().forEach(item -> {
                RawMaterial material = RawMaterial.findById(item.rawMaterialId());

                if (material != null) {
                    ProductComposition composition = new ProductComposition();
                    composition.product = product;
                    composition.rawMaterial = material;
                    composition.quantityRequired = item.quantityRequired();

                    product.composition.add(composition);
                }
            });
        }
    }
}
