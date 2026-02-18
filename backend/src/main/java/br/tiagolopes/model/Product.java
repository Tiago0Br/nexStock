package br.tiagolopes.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.ArrayList;

@Entity
public class Product extends PanacheEntity {
    @NotBlank(message = "name is required.")
    @Column(nullable = false)
    public String name;

    @NotNull(message = "price is required.")
    @Min(value = 0, message = "price cannot be less than 0.")
    @Column(nullable = false)
    public Double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    public List<ProductComposition> composition = new ArrayList<>();
}
