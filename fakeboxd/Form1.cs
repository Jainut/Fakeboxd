namespace fakeboxd
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		private void button1_Click(object sender, EventArgs e)
		{
			Form2 form2 = new Form2(this);

			form2.Show();
			this.Hide();
		}

		private void button2_Click(object sender, EventArgs e)
		{
			Form3 form3 = new Form3(this);

			form3.Show();
			this.Hide();
		}
	}
}
