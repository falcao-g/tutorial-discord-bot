const { SlashCommandBuilder, EmbedBuilder, time } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		// declaramos o nome e a descrição em inglês e usamos os metódos de localização para colocar em português
		// assim quem tiver o discord em português verá em português e se for qualquer outra língua verá em inglês
		.setName("user")
		.setNameLocalization("pt-BR", "usuário")
		.setDescription("See some information about a user")
		.setDescriptionLocalization("pt-BR", "Veja algumas informações sobre um usuário")
		// declaramos as permissões, nesse caso não queremos que o comando seja usado em DM
		.setDMPermission(false)
		// declaramos os argumentos, aqui declaramos uma opção obrigatória chamada user
		.addUserOption((option) =>
			option
				.setName("user")
				.setNameLocalization("pt-BR", "usuário")
				.setDescription("The user to get information")
				.setDescriptionLocalization("pt-BR", "O usuário para pegar as informações")
				.setRequired(true)
		),
	execute: async ({ interaction }) => {
		// eu sempre gosto de fazer isso para ter mais tempo para responder, fica aquela mensagem que o bot está pensando
		await interaction.deferReply().catch(() => {})

		// pegamos o usuário que foi passado como argumento
		const member = interaction.options.getMember("user")

		// pegamos informações do usuário e colocamos numa embed
		const embed = new EmbedBuilder()
			.setTitle(member.displayName)
			.setColor(member.displayColor)
			.setThumbnail(member.displayAvatarURL())
			.addFields(
				{
					name: "Membro do Discord desde",
					value: time(member.user.createdAt),
					inline: true,
				},
				{
					name: "Membro desse servidor desde",
					value: time(member.joinedAt),
					inline: true,
				}
			)
			.setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL() })

		// temos que editar a resposta e não só responder porque deferReply() foi usado anteriormente
		interaction.editReply({ embeds: [embed] })
	},
}
