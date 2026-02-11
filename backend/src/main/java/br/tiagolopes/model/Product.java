package br.tiagolopes.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Product extends PanacheEntity {

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public Double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    public List<ProductComposition> composition = new ArrayList<>();
}
