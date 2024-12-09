package com.example.project.controller;

import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import com.example.project.Dto.ResponseUserDto;
import com.example.project.Dto.UserDto;
import com.example.project.Entity.User;
import com.example.project.repository.UserRepository;
import com.example.project.service.CustomUserDetail;
import com.example.project.service.CustomUserDetailsService;
import com.example.project.service.JwtService;
import com.example.project.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired

    private UserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/register")
    public ResponseEntity<Object> saveUser(@RequestBody UserDto userDto) {
        // Check if the email already exists
        if (userRepository.existsByEmail(userDto.getEmail())) {
            // Return ResponseEntity with a conflict status and message
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists in the database");
        }

        // Save the user if email doesn't exist
        User user =userService.save(userDto);

        // Return ResponseEntity with OK status and success message
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseUserDto> createAuthenticationToken(@RequestBody UserDto userDto)
            throws BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        Authentication authentication;
        try {
            System.out.println("hello");
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));

        } catch (AuthenticationException e) {
            System.out.println(e);
            if (e instanceof LockedException) {
                // Handle locked account
                System.out.println("User account is locked");
                throw new LockedException("User account is locked");
            } else {
                // Handle other authentication failures
                System.out.println("Authentication failed: " + e.getMessage());
                throw new BadCredentialsException("Incorrect username or password");
            }
        }
        // UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(userDto.getEmail());

        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        // System.out.println("wwwww" + userDto.getEmail());
        // Optional<User> optionalUser =
        // userRepository.findFirstByEmail(userDetails.getUsername());
        String jwt;
        if (optionalUser.isPresent()) {
            HashMap<String, Object> data = new HashMap<>();
            data.put("id", optionalUser.get().getId());
            data.put("role", optionalUser.get().getRoles());
            data.put("email", optionalUser.get().getEmail());
            jwt = jwtService.generateToken(data, new CustomUserDetail(optionalUser.get()));
        } else
            jwt = jwtService.generateToken(userDetails);
        ResponseUserDto userDto1 = new ResponseUserDto();
        if (optionalUser.isPresent()) {

            userDto1.setJwt(jwt);
            userDto1.setEmail(optionalUser.get().getEmail());
            userDto1.setId(optionalUser.get().getId());
            userDto1.setRoles(optionalUser.get().getRoles());
        }
        // return authenticationResponse;
        return ResponseEntity.ok(userDto1);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/email")
    public ResponseEntity getEmail(@RequestBody String email) {

        Optional<User> optionalUser = userRepository.findByEmail(email);
        System.out.println("wwwww" + optionalUser);
        return ResponseEntity.ok("good");
    }

    @GetMapping("/currentUser")
    public ResponseEntity getCurrentUser(HttpServletRequest request) {

        // Extract the Authorization header
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;
        Long userId = null;

        // Check if the header is valid and contains 'Bearer ' token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extract token
            username = jwtService.extractUsername(jwt); // Extract username from the token
            System.out.println("wajdiii" + username);
            System.out.println("aliiii" + jwt);
            userId = jwtService.extractUserId(jwt);
            System.out.println("hhhhh" + userId);
        }
        if (userId != null) {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(new ResponseUserDto(user.getEmail(), user.getRoles()));
        }
        return null;
    }

}
