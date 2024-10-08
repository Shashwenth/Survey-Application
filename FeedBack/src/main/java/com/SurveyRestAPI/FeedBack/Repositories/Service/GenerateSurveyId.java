package com.SurveyRestAPI.FeedBack.Repositories.Service;

import java.util.Random;

import org.springframework.stereotype.Service;


@Service
public class GenerateSurveyId {

	public GenerateSurveyId() {
	}

	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	public static String generateRandomString(int length) {
		Random random = new Random();
		StringBuilder stringBuilder = new StringBuilder(length);

		for (int i = 0; i < length; i++) {
			int randomIndex = random.nextInt(CHARACTERS.length());
			stringBuilder.append(CHARACTERS.charAt(randomIndex));
		}

		return stringBuilder.toString();

	}

}
