package vttp2023.batch3.csf.assessment.cnserver.services;

import java.awt.*;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import vttp2023.batch3.csf.assessment.cnserver.models.News;
import vttp2023.batch3.csf.assessment.cnserver.models.TagCount;
import vttp2023.batch3.csf.assessment.cnserver.repositories.ImageRepository;
import vttp2023.batch3.csf.assessment.cnserver.repositories.NewsRepository;

@Service
public class NewsService {

	@Autowired
	private NewsRepository newsRepo;

	@Autowired
	private ImageRepository imageRepo;
	
	// TODO: Task 1
	// Do not change the method name and the return type
	// You may add any number of parameters
	// Returns the news id
	public String postNews(String title, MultipartFile file,String description, String tagString) throws IOException {

		// Upload file to S3 Bucket
		String imageUrl = imageRepo.uploadImage(file.getContentType(), file.getInputStream());

		System.out.println("Saving to mongodb: " + imageUrl);
		String newsId = newsRepo.insertNews(title, imageUrl, description, tagString);
		System.out.println("News ID: " + newsId);

		return newsId;
	}
	 
	// TODO: Task 2
	// Do not change the method name and the return type
	// You may add any number of parameters
	// Returns a list of tags and their associated count
	public List<TagCount> getTags(int timeInMinutes) {
		return newsRepo.getTags(timeInMinutes);
	}

	// TODO: Task 3
	// Do not change the method name and the return type
	// You may add any number of parameters
	// Returns a list of news
	public List<News> getNewsByTag(/* Any number of parameters */) {
		return new LinkedList<>();
	}
	
}
