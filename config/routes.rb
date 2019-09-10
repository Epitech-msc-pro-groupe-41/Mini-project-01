Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    resources :users, only: [:index, :show, :create, :update, :destroy]

    scope '/workingtimes' do

      get '/:id', to: 'workingtimes#index'
      get '/:id/:workgingtimeID', to: 'workingtimes#show'
      post '/:id', to: 'workingtimes#create'
      put '/:id', to: 'workingtimes#update'
      delete '/:id', to: 'workingtimes#destroy'

    end

    scope '/clocks' do
      get '/:id', to: 'clocks#index'
      post '/:id', to: 'clocks#create'
    end

  end


end

