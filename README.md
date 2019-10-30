# README

# ChatSpace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :messages
- has_many :comments

## massagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :messages
- belongs_to :comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :user