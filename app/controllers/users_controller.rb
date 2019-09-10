class UsersController < ApplicationController

  def index

    unless check_user_params
      return
    end
    user = User.where(email: user_params[:email], username: user_params[:username]).first

    if user.nil?
      render status: 400, json: {message: "User don't exist."}
    else
      render status: 200, json: {message: 'User exist.', user: user}
    end
  end

  def show

    user = get_user_from_id

    unless user
      return
    end
    render status: 200, json: {message: 'User exist.', user: user}
  end

  def create

    unless check_user_params
      return
    end

    begin
      user = User.create!(email: user_params[:email], username: user_params[:username])
    rescue => err
      render status: 400, json: {message: "User creation: #{err}"}
      return
    end
    render status: 200, json: {message: 'User created.', user: user}
  end

  def update

    email = params[:email] if params[:email]
    username = params[:username] if params[:username]

    if email.nil? && username.nil?
      render status: 400, json: {message: "No valid arguments specified."}
      return
    end

    user = get_user_from_id

    unless user
      return
    end

    if email
      user.update_attribute(:email, email)
    end
    if username
      user.update_attribute(:username, username)
    end

    render status: 200, json: {message: 'User updated.', user: user}
  end

  def destroy
    user = get_user_from_id

    unless user
      return
    end
    user.destroy
    render status: 200, json: {message: 'User deleted.'}
  end

  private

  def check_user_params
    if user_params[:email].nil?
      render status: 400, json: {message: 'Email not specified'}
      return false
    end

    if user_params[:username].nil?
      render status: 400, json: {message: 'Username not specified'}
      return false
    end
    return true
  end

  def user_params
    params.permit(:email, :username)
  end
end