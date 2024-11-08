require 'sinatra'
require 'json'
require 'prawn'
require 'sinatra/cors'

class PDFService < Sinatra::Base
  register Sinatra::Cors

  puts "CORS allow_origin: #{settings.allow_origin}"

  # CORS Settings
  set :allow_origin, 'https://taupe-toffee-5512eb.netlify.app'
  set :allow_methods, 'GET,HEAD,POST,OPTIONS'
  set :allow_headers, 'content-type,if-modified-since,authorization,X-Requested-With'
  set :expose_headers, 'location,link'

  before do
    response.headers['Access-Control-Allow-Origin'] = 'https://taupe-toffee-5512eb.netlify.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,POST,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
  end

  
  # Handle preflight OPTIONS requests
  options '*' do
    response.headers['Access-Control-Allow-Origin'] = settings.allow_origin
    response.headers['Access-Control-Allow-Methods'] = settings.allow_methods
    response.headers['Access-Control-Allow-Headers'] = settings.allow_headers
    200
  end

  # Root route
  get '/' do
    content_type 'text/html'
    '<h1>Hi This is Root</h1>'
  end

  # PDF generation route
  post '/generate-pdf' do
    puts 'Hello'
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
        question = question_group['question']
        question_text = question['text']
        question_type = question['type']

        pdf.text question_text.to_s, size: 12, style: :bold
        pdf.move_down 10

        if question_type == 'content' || question_type == 'heading'
          pdf.move_down 20
          next
        else
          question_group['responses'].each do |response|
            user = response['user']
            answer_text = response['answer'] ||
                          (response['optionAnswers']&.map { |opt| opt['value'] }&.join(', ') || 'N/A')

            pdf.text "User: #{user['username']} (ID: #{user['id']})", size: 10
            pdf.text "Answer: #{answer_text}", size: 10
            pdf.move_down 15
          end
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
