package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException.UnprocessableEntity;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthService authService;

	@Transactional(readOnly = true)
	public List<ReviewDTO> findAll() {
		
		List<Review> list = repository.findAll();
		return list.stream().map(x -> new ReviewDTO(x, x.getUser())).collect(Collectors.toList());
	}
	
	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
		
		// pega o usuário autenticado 
		User user = authService.authenticated();

		try {
			Review entity = new Review();
			copyEntityToDTO(entity, user, dto); 
			repository.save(entity);
			return new ReviewDTO(entity, user);
		}
		catch (UnprocessableEntity e) {
			throw new ResourceNotFoundException("Validation exception");
		}
	}
	

	public void copyEntityToDTO(Review entity, User user, ReviewDTO dto) {

		entity.setText(dto.getText());
		Movie movie = movieRepository.getOne(dto.getMovieId());
		entity.setMovie(movie);
		
		user.setId(userService.getProfile().getId());
		user.setName(userService.getProfile().getName());
		user.setEmail(userService.getProfile().getEmail());
		entity.setUser(user);
	}
	
}
