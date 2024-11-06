package com.example.project.service;

import com.example.project.Dto.UserDto;
import com.example.project.Entity.User;

public interface UserService {
    User save (UserDto userDto);
     User getUserByUsername(String username);
     User getUserById(Long id);
     User getUserByEmail(String email);
}
