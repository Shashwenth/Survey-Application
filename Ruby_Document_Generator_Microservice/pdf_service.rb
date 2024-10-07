require 'sinatra'
require 'json'
require 'prawn'

class PDFService < Sinatra::Base
  before do
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
  end

  options '*' do
    response.headers['Allow'] = 'GET, POST, OPTIONS'
    200
  end

  post '/generate-pdf' do
    content_type 'application/json'

    begin
      data = JSON.parse(request.body.read)

      # Extract data
      survey_id = data['surveyId']
      grouped_responses = data['groupedResponses']

      # Generate PDF using Prawn
      pdf = Prawn::Document.new
      pdf.text "Survey Responses for Survey ID: #{survey_id}", size: 16, style: :bold
      pdf.move_down 20

      grouped_responses.each do |question_id, question_group|
        pdf.text "Question: #{question_group['question']['text']}", size: 12, style: :bold
        pdf.move_down 10

        question_group['responses'].each do |response|
          user = response['user']
          answer_text = response['answer'] || 
                        (response['optionAnswers']&.map { |opt| opt['value'] }&.join(', ') || 'N/A')

          pdf.text "User: #{user['username']} (ID: #{user['id']})", size: 10
          pdf.text "Answer: #{answer_text}", size: 10
          pdf.move_down 15
        end

        pdf.move_down 20
      end

      # Save PDF to a temporary file
      pdf_file_path = "survey_#{survey_id}_responses.pdf"
      pdf.render_file(pdf_file_path)

      # Send the file back as a downloadable response
      send_file pdf_file_path, filename: pdf_file_path, type: 'application/pdf'
    rescue => e
      status 500
      { error: "An error occurred while generating the PDF: #{e.message}" }.to_json
    end
  end

  run! if app_file == $0
end
