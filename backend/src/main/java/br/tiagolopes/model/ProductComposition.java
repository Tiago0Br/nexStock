package br.tiagolopes.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
public class ProductComposition extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    public Product product;

    @ManyToOne
    @JoinColumn(name = "raw_material_id", nullable = false)
    public RawMaterial rawMaterial;

    @NotNull(message = "quantityRequired is required.")
    @Min(value = 0, message = "quantityRequired cannot be less than 0.")
    @Column(nullable = false)
    public Integer quantityRequired;
}
