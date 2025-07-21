class UserModel {
  final String id;
  final String name;
  final String email;
  final String? profileImage;
  final bool isEmailVerified;
  final String authProvider;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.profileImage,
    required this.isEmailVerified,
    required this.authProvider,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      profileImage: json['profileImage'],
      isEmailVerified: json['isEmailVerified'] ?? false,
      authProvider: json['authProvider'] ?? 'local',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'profileImage': profileImage,
      'isEmailVerified': isEmailVerified,
      'authProvider': authProvider,
    };
  }
}