package com.epiis.mi_app.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.epiis.mi_app.repository.CategoryRepository;
import com.epiis.mi_app.dto.*;
import com.epiis.mi_app.model.Category;
@Service
public class CategoryServices {
    @Autowired
    private CategoryRepository categoryRepository;

    public Page<CategoryDto> list(int page, int size){
        Page<Category> categories = categoryRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        return categories.map(this::convertToDto);
    }

    private CategoryDto convertToDto(Category category){
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setImageUrl(category.getImageUrl());
        return dto;
    }
    public CategoryDto save(Category category){
        return convertToDto(categoryRepository.save(category));
    }
    public void deleteCategory(String id){
        categoryRepository.deleteById(id);
    }
}
