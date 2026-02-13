package br.tiagolopes.resource;

import br.tiagolopes.dto.ProductDTO;
import br.tiagolopes.model.Product;
import br.tiagolopes.model.ProductComposition;
import br.tiagolopes.model.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {
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

        if (dto.composition() != null) {
            dto.composition().forEach(item -> {
                RawMaterial material = RawMaterial.findById(item.rawMaterialId());

                if (material != null) {
                    ProductComposition composition = new ProductComposition();
                    composition.product = product;
                    composition.rawMaterial = material;
                    composition.quantityRequired = item.quantity();

                    product.composition.add(composition);
                }
            });
        }

        product.persist();

        return Response.status(Response.Status.CREATED).entity(product).build();
    }
}
